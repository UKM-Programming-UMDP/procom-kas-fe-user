export type KasSubmissionModel = {
  submission_id: string;
  user: UserModel;
  payed_amount: number;
  status: {
    ID: number;
    Name: string;
  };
  note: string;
  evidence: string;
  submitted_at: string;
  updated_at: string;
};

export type UserModel = {
  npm: string;
  name: string;
};

export type KasSubmissionCreateModel = {
  user: {
    npm: string;
  };
  payed_amount: number;
  note: string;
  evidence: string | File[];
};
