export interface DirectoryGraph {
  public_key: string;
  nodes: GraphNode[];
  links: GraphLink[];
}

export interface GraphNode {
  id: number;
  group?: number;
  neighbors?: GraphNode[];
  links?: GraphLink[];
  pubkey: string;
  label?: string;
  memo?: string;
  ranking: number;
}

export interface GraphLink {
  source: number;
  target: number;
  value: number;
  height: number;
  time: number;
}
