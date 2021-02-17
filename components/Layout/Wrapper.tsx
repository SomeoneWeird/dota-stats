interface WrapperProps {
  children: React.ReactNode;
}

const Wrapper: React.FC = ({ children }: WrapperProps) => (
  <div className="max-w-7xl mx-auto py-3 px-3 sm:px-6 lg:px-8">{children}</div>
);

export default Wrapper;
