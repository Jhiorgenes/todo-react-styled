import { Header, Main, NewTaskArea, Spacer } from './styles'
import { Check, Eye, EyeSlash, Trash } from 'phosphor-react'
import { ChangeEvent, useEffect, useState } from 'react'
import * as Checkbox from '@radix-ui/react-checkbox'
import { GlobalStyles } from './GlobalStyles'
import { api } from './libs/api'
import todoImage from './assets/todo.jpg'

interface TaskProps {
  id: string
  name: string
  done: boolean
}

export const App = () => {
  const [newTaskName, setNewTaskName] = useState('')
  const [tasks, setTasks] = useState<TaskProps[]>([])
  const [isHidingCompletedTasks, setIsHidingCompletedTasks] = useState(false)

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

  async function handleUpdateTask(id: string, done: boolean) {
    try {
      const response = await api.put(`/todos/${id}`, {
        done,
      })
      getAllTasks()
    } catch (err) {
      console.error(err)
    }
  }

  async function handleDeleteTask(id: string) {
    const response = await api.delete(`/todos/${id}`)
    getAllTasks()
  }

  function handleChangeChecked(id: string) {
    const task = tasks.find(task => task.id === id)
    if (!task) return

    const done = !task.done
    handleUpdateTask(id, done)

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
          <img src={todoImage} alt="" />
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
