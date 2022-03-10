import TableTop from './containers/TableTop';
import { RecoilRoot, useRecoilSnapshot } from 'recoil';
import { useEffect, Suspense } from 'react';

function DebugObserver() {
    const snapshot = useRecoilSnapshot();
    useEffect(() => {
      console.debug('The following atoms were modified:');
      for (const node of snapshot.getNodes_UNSTABLE({isModified: true})) {
        console.debug(node.key, snapshot.getLoadable(node));
      }
    }, [snapshot]);
  
    return null;
  }

function App() {
    return (
        <RecoilRoot>
            <DebugObserver />
            <TableTop />
        </RecoilRoot>
    )
}

export default App;
