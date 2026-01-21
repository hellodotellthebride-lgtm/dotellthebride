import Image, { StaticImageData } from 'next/image';

type PhonePreview = {
  src: StaticImageData;
  alt?: string;
};

type PhonePreviewRowProps = {
  shots: PhonePreview[];
  className?: string;
};

export default function PhonePreviewRow({ shots, className }: PhonePreviewRowProps) {
  const combinedClassName = ['hero__strip', className].filter(Boolean).join(' ');

  return (
    <div className={combinedClassName}>
      {shots.map((shot, index) => (
        <div className="hero__strip-frame" key={shot.alt ?? index}>
          <Image src={shot.src} alt={shot.alt ?? 'Do Tell The Bride app preview'} className="hero__strip-img" />
        </div>
      ))}
    </div>
  );
}
