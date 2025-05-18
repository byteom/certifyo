import { Subject } from '@/components/types';
import { webDevelopment } from './subjects/web-development';
import { dataScience } from './subjects/data-science';
import { cloudComputing } from './subjects/cloud-computing';
import { devOps } from './subjects/devops';
import { machineLearning } from './subjects/machine-learning';
import {programmingLanguages} from './subjects/programming-languages'
import {cyberSecurity} from './subjects/cyber-security'
 

export const subjects: Subject[] = [
  webDevelopment,
  dataScience,
  devOps,
  cloudComputing,
  machineLearning,
  programmingLanguages,
  cyberSecurity,
];