import InfoTooltip from './InfoTooltip';
import {ReactComponent as Ico} from '../images/icoOk.svg';

const AuthOkPopup = ({isOpen, onClose}) => {
  return (
    <InfoTooltip
      isOpen={ isOpen }
      onClose={ onClose }
      ico={ <Ico /> }
      text='Вы успешно зарегистрировались!'
    />
  );
};

export default AuthOkPopup;
