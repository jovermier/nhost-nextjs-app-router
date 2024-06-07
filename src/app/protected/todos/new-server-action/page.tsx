import TodoForm from '~/components/todo-form';
import withAuthAsync from '~/utils/auth-guard';

const NewTodo = async () => {
  return (
    <div className="mx-auto flex max-w-3xl flex-col space-y-4">
      <h2 className="text-xl">New Todo</h2>
      <TodoForm />
    </div>
  );
};

export default withAuthAsync(NewTodo);
