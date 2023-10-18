import {Modal ,useMantineTheme} from '@mantine/core'
import PostShare from '../PostShare/PostShare';

function ShareModal({opend,setopend}) {
  const theme = useMantineTheme();
  
  return (
    <Modal
    title="Introduce yourself!"
    overlaycolor={
      theme.colorScheme === "dark"
      ? theme.colors.dark[9]
      : theme.colors.gray[2]
    }
    size='50%'
    opened={opend}
    onClose={() => setopend(false)}
      overlayopacity={0.95}
    >
    <PostShare/>
    </Modal>
  );
}

export default ShareModal