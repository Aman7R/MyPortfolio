import * as THREE from "three";
import type { WorkTimelinePoint } from "../types";

export const WORK_TIMELINE: WorkTimelinePoint[] = [
  {
    point: new THREE.Vector3(0, 0, 0),
    year: '2022',
    title: 'Started Journey',
    subtitle: 'Web Development',
    position: 'right',
  },
  {
    point: new THREE.Vector3(-4, -4, -3),
    year: '2024',
    title: 'Freelance',
    subtitle: 'Frontend Developer',
    position: 'left',
  },
  {
    point: new THREE.Vector3(-3, -1, -6),
    year: '2024',
    title: 'MIT College',
    subtitle: 'Bachelor of Science in Information Technology, From MIT College, Aurangabad',
    position: 'left',
  },
  {
    point: new THREE.Vector3(0, -1, -10),
    year: '2025',
    title: '3D Modeling Creative',
    subtitle: 'Blender Mastering',
    position: 'left',
  },
  {
    point: new THREE.Vector3(1, 1, -12),
    year: new Date().toLocaleDateString('default', { year: 'numeric' }),
    title: '?',
    subtitle: 'Open to Opportunities',
    position: 'right',
  }
]
