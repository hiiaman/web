export interface FeedbackCreate {
  name: string;
  email: string;
  message: string;
}

export interface FeedbackResponse {
  id: string;
  name: string;
  email: string;
  message: string;
  created_at: string;
}
