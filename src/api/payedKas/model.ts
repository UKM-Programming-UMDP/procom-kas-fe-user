export type PayedKasModel = {
  submission_id: string;
  user: {
    npm: string;
    name: string;
    email: string;
    kas_payed: number;
    month_start_pay: {
      id: number;
    };
  };
  payed_amount: number;
  status: string;
  note: string;
  evidence: string;
  submitted_at: string;
  updated_at: string;
};
