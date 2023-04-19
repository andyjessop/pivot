export interface Release {
  created_at: string;
  hash: string;
  html_filename: string;
  meta: Record<string, any>;
  uuid: string;
  service_worker_filename: string | null;
  project_id: string;
  service_worker_url: string | null;
  commit_message: string;
  commit_url: string;
}
