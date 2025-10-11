import { useState, useEffect, useContext } from 'react';
import { AppContext } from '../utils/appContext';
import { GraphNode, DirectoryGraph } from '../utils/appTypes';

export const useDirectoryGraph = (pubKey: string) => {
  const { requestGraph } = useContext(AppContext);

  const [graph, setGraph] = useState<DirectoryGraph>();

  useEffect(() => {
    let cleanup = () => {};
    const timeoutId = window.setTimeout(() => {
      if (pubKey) {
        cleanup = requestGraph(pubKey, (data) => setGraph(data)) ?? cleanup;
      }
    }, 0);

    return () => {
      cleanup();
      window.clearTimeout(timeoutId);
    };
  }, [pubKey, requestGraph]);

  const pkNode = graph?.nodes.find((n) => n.pubkey === pubKey) ?? null;

  const paths = graph?.links.map((link) => ({
    ...link,
    from: nodeName(link.source, graph.nodes),
    to: nodeName(link.target, graph.nodes),
  }));

  return { graph, paths, pkNode };
};

function nodeName(linkId: number, nodes: GraphNode[]): string {
  return nodes.find((n) => n.id === linkId)?.label || 'unknown';
}
