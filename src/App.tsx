import { useReactiveVar } from "@apollo/client";
import { IsLoggedInVar } from "./apollo";
import LoggedInRouter from "./routers/LoggedInRouter";
import LoggedOutRouter from "./routers/LoggedOutRouter";

function App() {
  const isLoggedIn = useReactiveVar(IsLoggedInVar);

  return isLoggedIn ? <LoggedInRouter /> : <LoggedOutRouter />;
}

export default App;
