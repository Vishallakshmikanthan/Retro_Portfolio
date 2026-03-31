import React from 'react';

class SystemErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("SystemErrorBoundary caught an error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="w-full h-full flex flex-col items-center justify-center p-4 bg-[#0000aa] border-2 border-white text-white font-mono text-xs text-center z-[9000]">
          <span className="text-xl mb-4 border-b border-white pb-2 block w-[80%] uppercase tracking-widest font-bold bg-[#c0c0c0] text-[#0000aa]">
            Windows
          </span>
          <p className="mb-4 text-justify max-w-[80%] font-bold">
            A fatal exception 0E has occurred at component root. The current application module will be terminated.
            <br/><br/>
            *  Press any key to terminate the current application.
            <br/>
            *  Press CTRL+ALT+DEL again to restart your computer. You will lose any unsaved information in all applications.
          </p>
          <div className="bg-[#0000aa] text-white p-2 mb-4 w-[80%] text-xs overflow-auto max-h-32 italic text-left border border-white/50 break-words">
            ERR: {this.state.error?.toString()}
          </div>
          <button 
            onClick={() => this.setState({ hasError: false })}
            className="mt-4 animate-pulse uppercase tracking-wider text-white"
          >
            Press any key to continue _
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

export default SystemErrorBoundary;
