import { Header, Main, NewTaskArea, Spacer } from './styles'
import { Root, Indicator } from '@radix-ui/react-checkbox'
import { Check, Eye, EyeSlash, Trash } from 'phosphor-react'
import { GlobalStyles } from './GlobalStyles'
import { ChangeEvent, useState } from 'react'

export const App = () => {
  const [tasks, setTasks] = useState([
    {
      id: 1,
      name: 'Give Jhoseph a bath',
      done: true,
    },
  ])
  const [isHidingCompletedTasks, setIsHidingCompletedTasks] = useState(false)
  const [newTaskName, setNewTaskName] = useState('')

  const completedTasks = tasks.filter(task => task.done)
  const filteredTasks = isHidingCompletedTasks
    ? tasks.filter(task => !task.done)
    : tasks

  const handleChangeChecked = (id: number) => {
    setTasks(prevTasks => {
      return prevTasks.map(task => {
        if (task.id === id) {
          return {
            ...task,
            done: !task.done,
          }
        }
        return task
      })
    })
  }

  const handleAddNewTask = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault()
    setTasks(prevTasks => [
      ...prevTasks,
      {
        id: prevTasks.length + 1,
        name: newTaskName,
        done: false,
      },
    ])
    setNewTaskName('')
  }

  const handleDeleteTask = (id: number) => {
    setTasks(prevTasks => {
      return prevTasks.filter(task => task.id !== id)
    })
  }

  const handleHideCompletedTasks = () => {
    setIsHidingCompletedTasks(prevHideCompletedTasks => !prevHideCompletedTasks)
  }

  return (
    <>
      <Header>
        <div>
          <h1>To-Do List</h1>
          <p>Let's stop procrastinating... eventually.</p>
        </div>
        <div>
          <img src="https://github.com/jhiorgenes.png" alt="" />
        </div>
      </Header>

      <Spacer />

      <Main>
        <div className="header-main">
          <h2>{completedTasks.length} Completed</h2>
          <button
            className="hide-task-button"
            onClick={handleHideCompletedTasks}
          >
            {isHidingCompletedTasks ? (
              <>
                <Eye /> <span>Show Completed</span>
              </>
            ) : (
              <>
                <EyeSlash /> <span>Hide Completed</span>{' '}
              </>
            )}
          </button>
        </div>

        <div className="task-area">
          {filteredTasks.map(task => (
            <div className="task-item" key={task.id}>
              <div>
                <Root
                  checked={task.done}
                  onCheckedChange={() => handleChangeChecked(task.id)}
                  id={task.id.toString()}
                >
                  <Indicator className="checkbox-indicator">
                    <Check size={18} color="#fff" />
                  </Indicator>
                </Root>
                <label
                  className={`
                  ${task.done ? 'lineThrough' : ''}`}
                  htmlFor={task.id.toString()}
                >
                  {task.name}
                </label>
              </div>
              <button onClick={() => handleDeleteTask(task.id)}>
                <Trash color="#ff0000" size={24} />
              </button>
            </div>
          ))}
        </div>

        <NewTaskArea onSubmit={handleAddNewTask}>
          <input
            value={newTaskName}
            onChange={e => setNewTaskName(e.target.value)}
            type="text"
            placeholder="Enter a new task here..."
          />
          <button disabled={newTaskName.trim() === ''}>Create</button>
        </NewTaskArea>
      </Main>

      <GlobalStyles />
    </>
  )
}
