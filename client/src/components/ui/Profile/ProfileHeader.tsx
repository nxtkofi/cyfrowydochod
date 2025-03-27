import TextDefault from "../HomePage/TextDefault";

type ProfileHeaderProps = {
  topText?: string;
  bottomText: string;
  bottomOnly?: boolean;
};

function ProfileHeader({
  topText,
  bottomText,
  bottomOnly,
}: ProfileHeaderProps) {
  return (
    <>
      {!bottomOnly && (
        <TextDefault bigTitle center variant="default">
          {topText} {""}
        </TextDefault>
      )}
      <div className="border-b-2 -mt-6 slate-200">
        <TextDefault variant={"default"} title center>
          {bottomText}
        </TextDefault>
      </div>
    </>
  );
}

export default ProfileHeader;
