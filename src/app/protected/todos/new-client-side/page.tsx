import withAuthAsync from '~/utils/auth-guard';
import TodoForm from './TodoForm';

const NewTodo = () => {
  return (
    <div className="mx-auto flex max-w-3xl flex-col space-y-4">
      <h2 className="text-xl">New Todo</h2>
      <TodoForm />
    </div>
  );
};

export default withAuthAsync(NewTodo);
