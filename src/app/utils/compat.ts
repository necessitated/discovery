import { Graph } from 'ngraph.graph';
import fromDot from 'ngraph.fromdot';
import { GraphLink, GraphNode } from './appTypes';

export const parseGraphDOT = (
  dotString: string,
  forKey: string,
  rankingFilter: number,
) => {
  const graph: Graph = fromDot(dotString || 'digraph{}');

  const nodes: GraphNode[] = [];

  graph.forEachNode((node: any) => {
    const pubkey = node.data.pubkey as string;
    const label = node.data.label as string;
    const ranking = Number(node.data.ranking);
    const memo = node.data.memo as string;

    if (forKey !== pubkey && rankingFilter / 100 > ranking) return;

    nodes.push({
      id: node.id,
      group: 1,
      label,
      pubkey,
      ranking,
      memo,
    });
  });

  const links: GraphLink[] = [];
  graph.forEachLink((link: any) => {
    const source = link.fromId;
    const target = link.toId;

    if (!nodes.map((n) => n.id).includes(source)) return;
    if (!nodes.map((n) => n.id).includes(target)) return;

    links.push({
      source,
      target,
      value: Number(link.data.weight),
      height: Number(link.data.height),
      time: Number(link.data.time),
    });
  });

  return { nodes, links };
};

export const shortenB64 = (value: string = '') => {
  if (value.startsWith('0000000000000000000000000000000000000000000')) {
    return value.substring(0, 1);
  }

  return value.replace(/0+=?$/g, '').substring(0, 25);
};

export const socketEventListener = <T>(
  event_type: string,
  handler: (data: T) => void,
): (() => void) => {
  const resultHandler = (event: Event) => {
    const customEvent = event as CustomEvent<T>;
    handler(customEvent.detail);
  };

  document.addEventListener(event_type, resultHandler);

  return () => {
    document.removeEventListener(event_type, resultHandler);
  };
};
