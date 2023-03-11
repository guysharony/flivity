interface IMenuItem {
  value: string;
  label: string;
}

export interface IMenu {
  className?: string;
  options: IMenuItem[];
}
