import { Router } from 'express';
import { signIn } from './authHandlers/signin.js';
import { signUp } from './authHandlers/signup.js';
import { createWorkflow } from './handlers/createWorkflow.js';
import { workflow } from './handlers/getWorkflow.js';
import { workflowExecution } from './handlers/workflowExecution.js';
import { saveNodesEdges } from './handlers/saveNodesEdges.js';

const router = Router();
 
router.post('/signup', signUp)
router.post('/signin', signIn)
router.post('/create/workflow', createWorkflow)
router.post('/workflow/workflowId', workflow)
router.post('/nodes/edges/save', saveNodesEdges)
router.get('/workflow/execution/workflowId', workflowExecution)

export default router;