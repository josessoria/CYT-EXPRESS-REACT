import { Button } from "@nextui-org/react";

export const AuthSubmit = ({
  onClick,
  label,
}: {
  onClick: any;
  label: string;
}) => {
  return (
    <Button
      color="secondary"
      onClick={() => onClick()}
      className="buttonsubmitsesion bg-[#8149FA] mt-[10px]  mb-[24px]"
    >
      {label}
    </Button>
  );
};
