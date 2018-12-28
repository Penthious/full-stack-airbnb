declare module "cloudinary" {
  export interface Cloudinary {
    config: ({  }: Config) => void;
    v2: {
      uploader: {
        upload: (
          fileName: string,
          options: { public_id: string },
          callback: (error: any, result: Result) => any,
        ) => Result;
      };
    };
  }
  export interface Result {
    public_id: string;
    version: number;
    signature: number;
    width: number;
    height: number;
    format: string;
    resource_type: string;
    created_at: string;
    tags: string[];
    bytes: number;
    type: string;
    etag: string;
    placeholder: string | boolean;
    url: string;
    secure_url: string;
    original_filename: string;
  }

  export interface Config {
    cloud_name: string;
    api_key: string;
    api_secret: string;
  }
}
