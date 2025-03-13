import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

export const GraphSkeleton = () => {
  return (
    <div className="chart-card p-4 shadow-lg rounded-3">
      <Skeleton height={30} width={200} className="mb-3" />
      <Skeleton height={300} />
    </div>
  );
};

export const GraphsLoading = () => {
  return (
    <div className="graphs-container container mt-5">
      <Skeleton height={50} width={300} className="mb-5 mx-auto" />
      <div className="row g-4">
        <div className="col-12 col-lg-6">
          <GraphSkeleton />
        </div>
        <div className="col-12 col-lg-6">
          <GraphSkeleton />
        </div>
        <div className="col-12">
          <GraphSkeleton />
        </div>
      </div>
    </div>
  );
};