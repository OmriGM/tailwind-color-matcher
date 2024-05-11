const BuyMeACoffee = () => {
  return (
    <a
      href="https://www.buymeacoffee.com/omrigr123c"
      target="_blank"
      rel="noopener noreferrer"
    >
      <img
        src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png"
        alt="Buy Me A Coffee"
        className={'w-32'}
        // style={{ height: '30px', width: '104px' }}
      />
    </a>
  );
};

export const DonationSection = () => {
  return (
    <div className="flex flex-col gap-1 flex-start items-center m-2">
      <span className="text-center text-sm text-vscode-description">
        Enjoying the extension? ☕ Show your support with a coffee to keep the
        updates brewing!
      </span>
      <BuyMeACoffee />
    </div>
  );
};
