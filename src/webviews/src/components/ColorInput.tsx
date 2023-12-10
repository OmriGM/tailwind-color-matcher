import Colorful from '@uiw/react-color-colorful';

const DEFAULT_COLOR = '#6226DB';

export const ColorInput = ({
  hex = DEFAULT_COLOR,
  onChange,
}: {
  hex: string;
  onChange: CallableFunction;
}) => {
  return (
    <div className="flex flex-col justify-center">
      <Colorful
        style={{ width: '100%' }}
        disableAlpha
        color={hex}
        onChange={(color) => {
          onChange(color.hex);
        }}
      />
      <div className={'flex gap-2 items-center'}>
        <input
          type={'text'}
          placeholder={DEFAULT_COLOR}
          className={`bg-${hex} my-4 py-1 px-3 rounded-md w-full bg-vscode-input-background text-vscode-input-foreground border border-vscode-input-border`}
          value={hex}
          onChange={({ target }) => {
            onChange(target.value);
          }}
        />
        <span
          className={'w-8 h-8 rounded-md'}
          style={{ backgroundColor: hex }}
        ></span>
      </div>
    </div>
  );
};
