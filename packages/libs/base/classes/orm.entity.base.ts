export abstract class OrmEntityBase {
  protected readonly props: unknown;

  constructor(props?: unknown) {
    if (props) {
      Object.assign(this, props);
    }
  }

  id!: string;
}
