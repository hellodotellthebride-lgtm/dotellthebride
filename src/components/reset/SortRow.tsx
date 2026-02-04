type Source = 'me' | 'someoneElse' | 'comparison' | null;

type SortRowProps =
  | {
      mode: 'source';
      text: string;
      source: Source;
      onSource: (source: Source) => void;
    }
  | {
      mode: 'keep';
      text: string;
      keep: boolean | null;
      onKeep: (keep: boolean) => void;
    };

const buttonClass = (selected: boolean) =>
  `reset-sort-button${selected ? ' reset-sort-button--active' : ''}`;

export default function SortRow(props: SortRowProps) {
  return (
    <div className="reset-sort-row">
      <p className="reset-sort-text">{props.text}</p>
      {props.mode === 'source' ? (
        <div className="reset-sort-actions">
          <button type="button" className={buttonClass(props.source === 'me')} onClick={() => props.onSource('me')}>
            💭 Coming from me
          </button>
          <button
            type="button"
            className={buttonClass(props.source === 'someoneElse')}
            onClick={() => props.onSource('someoneElse')}
          >
            🗣️ Coming from someone else
          </button>
          <button
            type="button"
            className={buttonClass(props.source === 'comparison')}
            onClick={() => props.onSource('comparison')}
          >
            📱 Coming from comparison / social media
          </button>
        </div>
      ) : (
        <div className="reset-sort-actions">
          <button type="button" className={buttonClass(props.keep === true)} onClick={() => props.onKeep(true)}>
            Keep for now
          </button>
          <button type="button" className={buttonClass(props.keep === false)} onClick={() => props.onKeep(false)}>
            Park this
          </button>
        </div>
      )}
    </div>
  );
}
