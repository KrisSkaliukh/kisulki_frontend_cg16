import { memo, useState } from 'react';
import { useSelector } from 'react-redux';

import Lection from '../../components/Lection';
import Switch from '../../components/Switch';
import LessonCard from '../../LessonCard';
import { RootState } from '../../redux/reducers/rootReducer';
import styles from './schedule.module.scss';

function Schedule() {
  const [activeOption, setActiveOption] = useState('left');

  const lessons = useSelector<RootState, any>((state) => state.mainReducer.lessons);

  const handleSwitchOption = (option: string) => {
    if (option === 'left') return setActiveOption('right');
    return setActiveOption('left');
  };

  const [isLectionOpen, setLectionOpen] = useState(false);
  const [currentLesson, setCurrentLesson] = useState<any>(null);

  const onActiveLessonClick = (lesson: any) => {
    setLectionOpen(true);
    setCurrentLesson(lesson);
  };

  const onActiveLessonClose = () => {
    setLectionOpen(false);
  };

  return (
    <div className={styles.content}>
      {isLectionOpen ? <Lection onClose={onActiveLessonClose} currentLesson={currentLesson} /> : (
        <>
          <div className={styles.title}>
            <h1>Расписание занятий</h1>
            <Switch
              activeOption={activeOption}
              onChange={() => handleSwitchOption(activeOption)}
            />
          </div>
          <div className={styles.cardsContainer}>
            {lessons
              .filter((i: any) => (activeOption === 'left' ? !i.isOnline : i.isOnline))
              .map((item: any) => (
                <LessonCard
                  key={item.id}
                  id={item.id}
                  title={item.title.includes('LMS') && !item.title.includes('LMS-')
                    ? item.title.slice(0, item.title.length - 3)
                    : item.title.slice(0, item.title.length - 5)}
                  date={item.start}
                  registrationTime={item.registrationTime}
                  audience={item.title.split(' ')[item.title.split(' ').length - 1]}
                  teacher={item.teacher}
                  onActiveLessonClick={onActiveLessonClick}
                  code={item.code}
                  group={`${item.groups.map(
                    (i: any) => i.title,
                  )}`}
                />
              ))}
          </div>
        </>
      )}
    </div>
  );
}

export default memo(Schedule);
