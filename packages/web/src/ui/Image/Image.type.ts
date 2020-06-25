export interface ImageProps
  extends React.DetailedHTMLProps<
    React.ImgHTMLAttributes<HTMLImageElement>,
    HTMLImageElement
  > {
  loadWidth: number;
  loadHeight: number;
  imageRef?: React.Ref<HTMLImageElement>;
  onImageLoad?: () => void;
}
