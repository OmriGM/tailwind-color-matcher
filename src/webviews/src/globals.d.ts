export type VSCodeMsgPoster = {
  postMessage: ({ type, value }: { type: string; value: unknown }) => void;
};

declare global {
  const tsvscode: VsCodeMsgPoster;
}
