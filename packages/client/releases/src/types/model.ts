export interface Release {
  commit_message: string;
  commit_url: string;
  created_at: string;
  hash: string;
  html_filename: string;
  meta: Record<string, any>;
  project_id: string;
  service_worker_filename: string | null;
  service_worker_url: string | null;
  uuid: string;
}
