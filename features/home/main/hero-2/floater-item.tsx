import Image, { StaticImageData } from "next/image";
import classNames from "classnames";

type FloaterItemProps = {
  img: string | StaticImageData
  classNames: string
}

export default function FloaterItem(props: FloaterItemProps) {
  const { classNames: classes, img } = props;
  const cn = classNames("size-10", classes);
  return (
    <Image
      className={cn}
      src={img}
      alt="core-task"
    />
  )
}
