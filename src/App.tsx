import { Header, Main, NewTaskArea, Spacer } from './styles'
import { Check, Eye, EyeSlash, Trash } from 'phosphor-react'
import * as Checkbox from '@radix-ui/react-checkbox'
import { GlobalStyles } from './GlobalStyles'
import { ChangeEvent, useEffect, useState } from 'react'
import { api } from './libs/api'
import { v4 as uuid } from 'uuid'

interface TaskProps {
  id: string
  name: string
  done: boolean
}

export const App = () => {
  const [tasks, setTasks] = useState<TaskProps[]>([])
  const [isHidingCompletedTasks, setIsHidingCompletedTasks] = useState(false)
  const [newTaskName, setNewTaskName] = useState('')

  const completedTasks = tasks.filter(task => task.done)
  const filteredTasks = isHidingCompletedTasks
    ? tasks.filter(task => !task.done)
    : tasks

  async function getAllTasks() {
    try {
      const response = await api.get('/todos')
      console.log(response.data)

      setTasks(response.data)
    } catch (err) {
      console.error(err)
    }
  }

  const handleAddNewTask = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      const response = await api.post('/todos', {
        name: newTaskName,
      })
      getAllTasks()
      setNewTaskName('')
    } catch (err) {
      console.error(err)
    }
  }

  async function handleDeleteTask(id: string) {
    const response = await api.delete(`/todos/${id}`)
    getAllTasks()
  }

  function handleChangeChecked(id: string) {
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

  const handleHideCompletedTasks = () => {
    setIsHidingCompletedTasks(prevHideCompletedTasks => !prevHideCompletedTasks)
  }

  useEffect(() => {
    getAllTasks()
  }, [])

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
                <Checkbox.Root
                  checked={task.done}
                  onCheckedChange={() => handleChangeChecked(task.id)}
                  id={task.id}
                >
                  <Checkbox.Indicator className="checkbox-indicator">
                    <Check size={18} color="#fff" />
                  </Checkbox.Indicator>
                </Checkbox.Root>
                <label
                  className={`
                  ${task.done ? 'lineThrough' : ''}`}
                  htmlFor={task.id}
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
