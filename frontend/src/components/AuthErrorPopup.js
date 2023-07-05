import InfoTooltip from './InfoTooltip';
import {ReactComponent as Ico} from '../images/icoError.svg';

const AuthErrorPopup = ({isOpen, onClose}) => {
  return (
    <InfoTooltip
      isOpen={ isOpen }
      onClose={ onClose }
      ico={ <Ico /> }
      text='Что-то пошло не так! Попробуйте ещё раз.'
    />
  );
};

export default AuthErrorPopup;
