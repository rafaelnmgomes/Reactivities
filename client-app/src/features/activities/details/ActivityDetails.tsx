import { Button, Card, Image } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";

const ActivityDetails = () => {
  const { activityStore } = useStore();
  const { selectedActivity, openForm, cancelSelectActivity } = activityStore;

  if (!selectedActivity) return <div></div>;

  return (
    <Card fluid>
      <Image src={`/assets/categoryImages/${selectedActivity.category}.jpg`} />
      <Card.Content>
        <Card.Header>{selectedActivity.title}</Card.Header>
        <Card.Meta>
          <span>{selectedActivity.date}</span>
        </Card.Meta>
        <Card.Description>{selectedActivity.description}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Button.Group widths="2">
          <Button
            onClick={() => openForm(selectedActivity.id)}
            basic
            color="blue"
            content="Edit"
          />
          <Button
            basic
            color="grey"
            content="Cancel"
            onClick={cancelSelectActivity}
          />
        </Button.Group>
      </Card.Content>
    </Card>
  );
};

export default ActivityDetails;
