export interface MatchResponse {
  id: string;
  pet_a_id: string;
  pet_b_id: string;
  chat_room_id: string;
  created_at: string;
}

export interface MessageResponse {
  id: string;
  room_id: string;
  sender_pet_id: string;
  content: string;
  created_at: string;
}

export interface MessageCreate {
  content: string;
}

export interface MessagesParams {
  limit?: number;
  offset?: number;
}
