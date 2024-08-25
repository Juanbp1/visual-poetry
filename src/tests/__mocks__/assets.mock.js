import videoLayer from '../../../../assets/videos/video-layer.mp4';
import {
  designImgLayer,
  windowImgLayer,
} from '../../assets/imgs/ui/design/layer';

jest.mock(designImgLayer, () => ({
  default: 'mockedDesignImage',
}));

jest.mock(windowImgLayer, () => ({
  default: 'mockedWindowImage',
}));

jest.mock(videoLayer, () => ({
  default: 'mockedVideo',
}));
