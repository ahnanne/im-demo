import styled from 'styled-components';

type InputProps = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

const ToggleButton = (props: InputProps) => {
  const { onChange, checked, id } = props;

  return (
    <StyledButtonCover>
      <div className="button b2" id="button-16">
        <input
          type="checkbox"
          className="checkbox"
          onChange={onChange}
          checked={!checked}
          id={id}
        />
        <div className="knobs"></div>
        <div className="layer"></div>
      </div>
    </StyledButtonCover>
  );
};

export default ToggleButton;

/** 출처: https://codepen.io/himalayasingh/pen/EdVzNL */
const StyledButtonCover = styled.div`
  height: 100%;

  .knobs,
  .layer {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
  }

  .button {
    position: relative;
    top: 50%;
    width: 74px;
    height: 36px;
    margin: -20px auto 0 auto;
    overflow: hidden;
  }

  .button.b2 {
    border-radius: 2px;
  }

  .checkbox {
    position: relative;
    width: 100%;
    height: 100%;
    padding: 0;
    margin: 0;
    opacity: 0;
    cursor: pointer;
    z-index: 3;
  }

  .knobs {
    z-index: 2;
  }

  .layer {
    width: 100%;
    background-color: #ebf7fc;
    transition: 0.3s ease all;
    z-index: 1;
  }

  #button-16 .knobs::before {
    content: 'YES';
    position: absolute;
    top: 4px;
    left: 4px;
    width: 20px;
    height: 10px;
    color: #fff;
    font-size: 10px;
    font-weight: bold;
    text-align: center;
    line-height: 1;
    padding: 9px 4px;
    background-color: #03a9f4;
    border-radius: 2px;
    transition: 0.3s ease all, left 0.3s cubic-bezier(0.18, 0.89, 0.35, 1.15);
  }

  #button-16 .checkbox:active + .knobs::before {
    width: 46px;
  }

  #button-16 .checkbox:checked:active + .knobs::before {
    margin-left: -26px;
  }

  #button-16 .checkbox:checked + .knobs::before {
    content: 'NO';
    left: 42px;
    background-color: #f44336;
  }

  #button-16 .checkbox:checked ~ .layer {
    background-color: #fcebeb;
  }
`;
