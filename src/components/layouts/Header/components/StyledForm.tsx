import styled from "styled-components";


const StyledForm = styled.div` 
.form-body {
    margin-top: 30px;

    .wrapper{
      display: flex;
      margin-left: 60px;

      img{
        width: 30px;
        height: 30px;
        margin-right: 5px;
      }

      label{
        display: flex;
        align-items: center;
        margin-left: 20px;
      }

      input{
        margin-left: 5px;
      }
    }

    p{
      font-size: 11px;
      color: red;
    }
    .form-item {
      margin: 10px 0;
      display: flex;
      align-items: center;
     & > label {
        display: inline-block;
        font-size: 14px;
        width: 130px;
      }

      input {
        border: 1px solid #635d5d;
        border-radius: 6px;
        padding-left: 6px;
        font-size: 15px;

        &:focus{
        outline: var(--primary-color) 2px solid;
        }
      }

      input[type="radio"]{
        &:focus{
        outline: none;
        }
      }
    }

    .btn-submit {
      background-color: var(--primary-color);
      color: var(--white-color);
      padding: 5px;
      font-weight: 500;
      font-size: 18px;
      border-radius: 4px;
      text-align: center;
      width: 100px;
      margin-top: 10px;
      &:hover {
        filter: brightness(1.2);
      }
    }
  }`
;

export default StyledForm;