import Button from "./Button";
import Dialog, { DialogProps } from "./Dialog";
import Card from "./Card";
import CardBody from "./CardBody";

type DialogDeleteConfirmationProps = {
  onClickAccept: () => void;
  onClickCancel: () => void;
} & DialogProps;

export default function DialogDeleteConfirmation(
  props: DialogDeleteConfirmationProps,
) {
  return (
    <Dialog dialog={props.dialog} closeDialog={props.closeDialog} width="500px">
      <Card>
        <CardBody>
          <p className="text-2xl">Delete?</p>
          <p className="py-4">The selected element will be deleted</p>
          <div className="flex justify-end gap-1">
            <Button onClick={props.onClickCancel} outline>
              Cancel
            </Button>
            <Button onClick={props.onClickAccept}>Accept</Button>
          </div>
        </CardBody>
      </Card>
    </Dialog>
  );
}
