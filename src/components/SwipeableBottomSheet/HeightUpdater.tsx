import { FC, useCallback, useEffect } from 'react';
import { HeightUpdaterProps } from './height-updater.interfaces';

// class HeightUpdater extends Component<HeightUpdaterProps, {}> {
//   constructor(props: HeightUpdaterProps) {
//     super(props);
//     this.onWindowResize = this.onWindowResize.bind(this);
//   }

//   public componentDidMount(): void {
//     window.addEventListener(`resize`, this.onWindowResize);
//   }

//   public componentWillUnmount(): void {
//     window.removeEventListener(`resize`, this.onWindowResize);
//   }

//   public onWindowResize(): void {
//     const height = window.innerHeight;
//     const { height: propsHeight, onHeightChange } = this.props;
//     if (height !== propsHeight) {
//       onHeightChange(height);
//     }
//   }

//   public render(): ReactNode {
//     return null;
//   }
// }

const HeightUpdater: FC<HeightUpdaterProps> = ({ height: propsHeight, onHeightChange }) => {
  const onWindowResize = useCallback(() => {
    const height = window.innerHeight;
    if (height !== propsHeight) {
      onHeightChange(height);
    }
  }, [propsHeight, onHeightChange]);

  useEffect(() => {
    window.addEventListener(`resize`, onWindowResize);
    return (): void => {
      window.removeEventListener(`resize`, onWindowResize);
    };
  }, [onWindowResize]);
  return null;
};

export default HeightUpdater;
