import Feedback from './components/Feedback';
import Progress from '@/components/ui/Progress'


const StartLearning: React.FC = () => {

  return (
      <div>
            StartLearning
           <div className="py-2">
              <Progress
                    className="flex justify-start"
                    percent={30}
                />
           </div>
            <div className="shadow-xl xl:w-1/4 md:w-1/2 w-[50%] rounded-lg absolute right-4 bottom-4 ">
                <p className='capitalize text-base text-black text-center pt-2'>Submit your Feedback </p>
                <Feedback/>
            </div>
      </div>
  );
};

export default StartLearning;
