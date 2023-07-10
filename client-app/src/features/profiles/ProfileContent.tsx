import { Tab } from "semantic-ui-react";
import ProfilePhotos from "./ProfilePhotos";

const ProfileContent = () => {
  const panes = [
    { menuItem: "About", render: () => <Tab.Pane>About Contet</Tab.Pane> },
    { menuItem: "Photos", render: () => <ProfilePhotos /> },
    { menuItem: "Events", render: () => <Tab.Pane>Events Contet</Tab.Pane> },
    {
      menuItem: "Followers",
      render: () => <Tab.Pane>Followers Contet</Tab.Pane>,
    },
    {
      menuItem: "Following",
      render: () => <Tab.Pane>Following Contet</Tab.Pane>,
    },
  ];

  return (
    <Tab
      menu={{ fluid: true, vertical: true }}
      menuPosition="right"
      panes={panes}
    />
  );
};

export default ProfileContent;
