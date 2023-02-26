import styled from 'styled-components'

export const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;

  h1 {
    color: var(--gray-100);
    font-size: var(--font-large);
    font-weight: 700;
  }

  p {
    padding-top: 0.5rem;
    color: var(--gray-300);
  }

  img {
    height: 50px;
    width: 50px;
    border-radius: 50%;
    object-fit: cover;
  }
`

export const Spacer = styled.div`
  margin-top: 1.25rem;
  height: 1px;
  background-color: var(--background-100);
`

export const Main = styled.main`
  margin-top: 2.5rem;

  .header-main {
    display: flex;
    justify-content: space-between;
    align-items: center;

    h2 {
      color: var(--gray-300);
      font-size: 0.875rem;
      font-weight: 400;
    }

    button {
      height: 3.125rem;
      padding: 0 1.5rem;
      border-radius: 10px;
      border: 0;
      background-color: var(--background-100);
      color: var(--gray-300);
      font-size: var(--font-base);

      transition: all ease 0.2s;

      &:hover {
        filter: brightness(0.9);
      }
    }
  }

  .hide-task-button {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .task-area {
    margin-top: 1.875rem;
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
    margin-bottom: 5rem;

    .task-item {
      display: flex;
      align-items: center;
      justify-content: space-between;

      animation: fade-in 0.5s ease;

      button {
        background-color: transparent;
        border: 0;

        transition: all ease 0.2s;

        &:hover {
          filter: brightness(0.6);
        }
      }

      div {
        display: flex;
        align-items: center;
        gap: 0.75rem;

        button {
          height: 24px;
          width: 24px;
          background-color: transparent;
          border: 0;
          border-radius: 6px;
          border: 1px solid var(--gray-100);

          transition: all ease-in-out 0.3s;

          &[data-state='checked'] {
            background-color: var(--blue-300);
            border: 0;
          }

          .checkbox-indicator {
            display: flex;
            justify-content: center;
            align-items: center;
          }
        }

        label {
          color: var(--gray-100);
          font-size: var(--font-base);
        }
      }

      @keyframes fade-in {
        from {
          opacity: 0;
          transform: translateY(-100px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
    }
  }
`

export const NewTaskArea = styled.form`
  position: fixed;
  bottom: 2rem;
  right: 5rem;
  left: 5rem;
  margin-top: 3.75rem;
  height: 3.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  background-color: var(--background-100);
  border-radius: 8px;
  padding: 1rem 0.5rem;

  @media (max-width: 720px) {
    bottom: 2rem;
    right: 1rem;
    left: 1rem;
  }

  input {
    width: 100%;
    background: transparent;
    border: 0;
    outline: var(--background);
    color: var(--gray-100);
    padding-left: 1rem;
    font-size: var(--font-medium);
  }

  button {
    background-color: var(--background);
    border: 0;
    height: 3rem;
    padding: 0 1rem;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 8px;
    color: var(--gray-100);
    font-size: var(--font-base);

    transition: all ease 0.2s;

    &:not(:disabled):hover {
      filter: brightness(0.8);
    }

    &:disabled {
      opacity: 0.5;
    }
  }
`
