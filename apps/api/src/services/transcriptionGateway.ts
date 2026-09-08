import { Server as HttpServer } from 'http';
import { WebSocketServer, WebSocket, RawData } from 'ws';

export interface MeetingTranscriptEntry {
  id: string;
  meetingId: string;
  speaker: string;
  speakerRole?: string;
  text: string;
  isFinal: boolean;
  timestamp: string;
  confidence?: number;
}

interface ClientSession {
  ws: WebSocket;
  meetingId: string;
  speaker: string;
  speakerRole: string;
  joinedAt: Date;
}

// In-memory transcript store per meeting (PoC cache)
const meetingTranscripts: Record<string, MeetingTranscriptEntry[]> = {};
const activeSessions: Map<WebSocket, ClientSession> = new Map();

export function initTranscriptionGateway(server: HttpServer) {
  const wss = new WebSocketServer({
    server,
    path: '/api/ws/transcribe'
  });

  console.log('🎙️ [ASR Gateway] WebSocket Streaming Server initialized at /api/ws/transcribe');

  wss.on('connection', (ws: WebSocket) => {
    console.log('🎙️ [ASR Gateway] New client connected');

    ws.on('message', (message: RawData, isBinary: boolean) => {
      try {
        if (isBinary) {
          // Binary Audio Stream (e.g. PCM 16kHz mono audio chunk from AudioWorklet)
          handleBinaryAudio(ws, message as Buffer);
          return;
        }

        const dataStr = message.toString();
        const payload = JSON.parse(dataStr);

        switch (payload.type) {
          case 'JOIN_MEETING': {
            const meetingId = payload.meetingId || 'general-meeting';
            const speaker = payload.speaker || 'Thành viên AVG';
            const speakerRole = payload.speakerRole || 'Người phát biểu';

            activeSessions.set(ws, {
              ws,
              meetingId,
              speaker,
              speakerRole,
              joinedAt: new Date()
            });

            // Send existing meeting history if available
            const history = meetingTranscripts[meetingId] || [];
            ws.send(JSON.stringify({
              type: 'MEETING_JOINED',
              meetingId,
              history,
              message: `Đã kết nối thành công tới phòng họp: ${meetingId}`,
              timestamp: new Date().toISOString()
            }));

            // Notify others
            broadcastToMeeting(meetingId, ws, {
              type: 'USER_JOINED',
              meetingId,
              speaker,
              speakerRole,
              timestamp: new Date().toISOString()
            });
            break;
          }

          case 'CHANGE_SPEAKER': {
            const session = activeSessions.get(ws);
            if (session) {
              session.speaker = payload.speaker || session.speaker;
              session.speakerRole = payload.speakerRole || session.speakerRole;
            }
            break;
          }

          case 'TRANSCRIPT_INTERIM': {
            const session = activeSessions.get(ws);
            const meetingId = session ? session.meetingId : payload.meetingId;
            const speaker = session ? session.speaker : (payload.speaker || 'Thành viên AVG');

            // Broadcast interim (temporary typing effect) to all clients in this meeting
            broadcastToMeeting(meetingId, ws, {
              type: 'TRANSCRIPT_INTERIM',
              id: payload.id || `interim-${Date.now()}`,
              meetingId,
              speaker,
              text: payload.text,
              timestamp: new Date().toISOString()
            });
            break;
          }

          case 'TRANSCRIPT_FINAL': {
            const session = activeSessions.get(ws);
            const meetingId = session ? session.meetingId : payload.meetingId;
            const speaker = session ? session.speaker : (payload.speaker || 'Thành viên AVG');
            const speakerRole = session ? session.speakerRole : payload.speakerRole;

            const entry: MeetingTranscriptEntry = {
              id: payload.id || `final-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
              meetingId,
              speaker,
              speakerRole,
              text: payload.text,
              isFinal: true,
              timestamp: payload.timestamp || new Date().toLocaleTimeString('vi-VN', { hour12: false }),
              confidence: payload.confidence || 0.98
            };

            if (!meetingTranscripts[meetingId]) {
              meetingTranscripts[meetingId] = [];
            }
            meetingTranscripts[meetingId].push(entry);

            // Broadcast final finalized text to all clients in this meeting
            broadcastToMeeting(meetingId, null, {
              type: 'TRANSCRIPT_FINAL',
              entry
            });
            break;
          }

          case 'CLEAR_TRANSCRIPT': {
            const meetingId = payload.meetingId;
            if (meetingId && meetingTranscripts[meetingId]) {
              meetingTranscripts[meetingId] = [];
              broadcastToMeeting(meetingId, null, {
                type: 'TRANSCRIPT_CLEARED',
                meetingId
              });
            }
            break;
          }

          case 'PING': {
            ws.send(JSON.stringify({ type: 'PONG', timestamp: Date.now() }));
            break;
          }

          default:
            console.log('🎙️ [ASR Gateway] Unknown message type:', payload.type);
        }
      } catch (err) {
        console.error('🎙️ [ASR Gateway] Error parsing message:', err);
      }
    });

    ws.on('close', () => {
      const session = activeSessions.get(ws);
      if (session) {
        console.log(`🎙️ [ASR Gateway] Client disconnected (${session.speaker} from ${session.meetingId})`);
        broadcastToMeeting(session.meetingId, ws, {
          type: 'USER_LEFT',
          meetingId: session.meetingId,
          speaker: session.speaker,
          timestamp: new Date().toISOString()
        });
        activeSessions.delete(ws);
      }
    });

    ws.on('error', (err) => {
      console.error('🎙️ [ASR Gateway] WebSocket error:', err);
    });
  });

  return wss;
}

// Broadcast to all participants in a meeting
function broadcastToMeeting(meetingId: string, excludeWs: WebSocket | null, payload: any) {
  const jsonStr = JSON.stringify(payload);
  activeSessions.forEach((session, socket) => {
    if (session.meetingId === meetingId && socket !== excludeWs && socket.readyState === WebSocket.OPEN) {
      socket.send(jsonStr);
    }
  });
}

// Handle Raw PCM Audio Chunks
function handleBinaryAudio(ws: WebSocket, audioBuffer: Buffer) {
  const session = activeSessions.get(ws);
  if (!session) return;

  // In Phase 1 PoC: We support passing binary chunks.
  // When an upstream ASR key (e.g. Deepgram or local Whisper streaming) is set,
  // this buffer will be piped to the upstream streaming connection.
}

export function getGatewayStats() {
  return {
    activeConnections: activeSessions.size,
    activeMeetings: Object.keys(meetingTranscripts).length,
    cachedMeetings: Object.keys(meetingTranscripts).map(id => ({
      meetingId: id,
      transcriptCount: meetingTranscripts[id].length
    }))
  };
}

export function getMeetingTranscript(meetingId: string): MeetingTranscriptEntry[] {
  return meetingTranscripts[meetingId] || [];
}
