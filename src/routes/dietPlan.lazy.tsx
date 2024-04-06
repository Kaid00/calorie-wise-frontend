import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/dietPlan')({
  component: () => <div>Hello /dietPlan!</div>
})