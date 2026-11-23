window.PROJECTS = {
  uvavatar: {
    number: '01',
    title: 'UVAvatar: 3D Gaussian Avatar Reconstruction via UV Feature Mapping',
    subtitle: 'Final Year Project · Animatable 3D human reconstruction from monocular video',
    sections: [
      {
        title: 'Project Overview',
        introMedia: [
          {
            type: 'image',
            src: '../assets/images/uvavatar-motion-01.gif',
            alt: 'Animated UVAvatar comparison for the male-3-casual sequence'
          },
          {
            type: 'image',
            src: '../assets/images/uvavatar-motion-02.gif',
            alt: 'Animated UVAvatar comparison for the female-3-casual sequence'
          }
        ],
        paragraphs: [
          'This project aims to reconstruct a personalized, animatable 3D human avatar from monocular video. The system combines an SMPL mesh for body structure and pose control with 3D Gaussians for detailed appearance. We build a UV-space network to predict pose-dependent offsets to Gaussian attributes, helping improve local deformation and rendering quality.'
        ]
      },
      {
        title: 'Technical Approach',
        introMedia: [
          {
            type: 'image',
            src: '../assets/images/uvavatar-framework.png',
            alt: 'UVAvatar framework diagram',
            caption: 'Figure 1. Overall framework: UV displacement map construction, local pose map construction, Gaussian attribute correction, and rendering.'
          }
        ],
        paragraphs: [
          '(a) UV displacement map. At each frame, the posed SMPL mesh and canonical mesh are rasterized into UV position maps. Each valid UV pixel stores the 3D coordinates of its corresponding surface point. The displacement map captures pose-dependent surface movement relative to the canonical body. The canonical position map and displacement map are Fourier-encoded and concatenated to form the geometric input.',
          '(b) Local pose map. The SMPL pose contains the rotations of 23 body joints. These rotations are mapped onto the UV surface using fixed skinning weights, producing a local pose map that provides spatially varying pose information across different body regions.',
          '(c) Gaussian feature offsets. The geometric input, identity reference image, and local pose map are encoded and fused by the UV network to produce a feature-offset map. Bilinear sampling at each Gaussian UV coordinate yields corrections for center, rotation, color, scale, and opacity. A separate coverage-correction map applies bounded adjustments to scale and opacity. Surface-consistency regularization encourages coherent changes among Gaussians bound to neighboring mesh regions.'
        ]
      },
      {
        title: 'My Contributions',
        bullets: [
          'Designed and implemented the UV-space Gaussian attribute-correction branch, including feature-map prediction, UV sampling, and the application of predicted offsets to Gaussian attributes.',
          'Constructed canonical and posed UV position maps and derived displacement maps as geometric inputs to the network.',
          'Implemented local pose conditioning using rotations from 23 SMPL joints and fixed UV skinning weights.',
          'Incorporated surface-consistency constraints to encourage coherent Gaussian deformation across neighboring mesh regions.',
          'Conducted model training, quantitative comparisons, qualitative evaluations, and ablation experiments on the PeopleSnapshot dataset.'
        ]
      },
      {
        title: 'Quantitative Results',
        paragraphs: [
          'Across four PeopleSnapshot sequences, the method achieved mean scores of 32.25 dB PSNR, 0.9825 SSIM, and 0.0176 LPIPS. It was compared with InstantAvatar, GoMAvatar, GaussianAvatar, and SplattingAvatar.'
        ],
        media: [
          {
            type: 'image',
            src: '../assets/images/uvavatar-metrics.png',
            alt: 'UVAvatar quantitative comparison table',
            caption: 'Figure 2. Quantitative comparison across four PeopleSnapshot sequences. Higher PSNR and SSIM and lower LPIPS indicate better results.'
          }
        ]
      },
      {
        title: 'Ablation Study',
        paragraphs: [
          'Removing local pose conditioning caused the largest overall performance drop. Coverage correction improved all three metrics. Surface-consistency regularization slightly reduced PSNR but improved SSIM and LPIPS.'
        ],
        media: [
          {
            type: 'image',
            src: '../assets/images/uvavatar-ablation.png',
            alt: 'UVAvatar ablation study table',
            caption: 'Figure 3. Ablation results for local pose conditioning, coverage correction, and surface-consistency regularization.'
          }
        ]
      },
      {
        title: 'Qualitative Results',
        paragraphs: ['Full-body and local-region reconstruction comparisons.'],
        media: [
          {
            type: 'image',
            src: '../assets/images/uvavatar-face-comparison.png',
            alt: 'UVAvatar facial-region comparison',
            caption: 'Figure 4. Facial-region comparison. UVAvatar preserves clearer facial appearance than SplattingAvatar; GaussianAvatar shows a visible artifact.'
          },
          {
            type: 'image',
            src: '../assets/images/uvavatar-body-comparison.png',
            alt: 'UVAvatar arm and clothing-boundary comparison',
            caption: 'Figure 5. Arm and clothing-boundary comparison, showing local appearance and alignment with the ground truth.'
          }
        ]
      }
    ],
    next: { key: 'fstalker', title: 'FS-Talker' }
  },

  fstalker: {
    number: '02',
    title: 'FS-Talker: Few-Shot 3D Gaussian Talking-Head Synthesis',
    subtitle: 'Few-shot, audio-driven facial animation using 3D Gaussian Splatting',
    sections: [
      {
        title: 'Project Overview',
        introMedia: [
          {
            type: 'video',
            src: '../assets/video/fstalker-demo.mp4',
            poster: '../assets/images/fstalker-reconstruction.png'
          }
        ],
        paragraphs: [
          'FS-Talker creates an audio-driven 3D talking-head avatar from a short video of a target person. It first learns shared speech-related facial motion from multiple speakers, then adapts a small set of identity-specific parameters to the target person. The resulting avatar supports synchronized lip movement, facial animation, and controllable head motion.'
        ]
      },
      {
        title: 'Technical Approach',
        paragraphs: [
          'FS-Talker uses a two-stage learning framework. During generic training, multiple identities are used to learn shared and identity-specific facial motion. For each Gaussian center, the K-Former models temporally consistent motion and predicts a coarse deformation residual. In parallel, the identity-motion branch combines spatial Gaussian features with audio features and expression parameters to predict an identity-specific residual. The generic-motion network predicts shared changes to Gaussian position, rotation, and scale. During few-shot identity training, the shared motion prior is reused while the target identity branch is adapted using a short video.'
        ],
        media: [
          {
            type: 'image',
            src: '../assets/images/fstalker-framework.png',
            alt: 'FS-Talker framework diagram',
            caption: 'Figure 6. FS-Talker framework. Generic motion learning followed by identity-specific adaptation.'
          }
        ]
      },
      {
        title: 'My Contributions',
        bullets: [
          'Reproduced and analyzed the FS-Talker implementation, including environment configuration, pretrained-model preparation, data processing, inference, and evaluation.',
          'Conducted self-reconstruction experiments to evaluate identity-specific facial reconstruction and fine-grained appearance preservation.',
          'Conducted cross-lingual audio-driven experiments to evaluate whether facial motion and lip synchronization generalized to driving audio in a language different from the target video.'
        ]
      },
      {
        title: 'Results',
        paragraphs: [
          'In a representative self-reconstruction sequence, FS-Talker achieved a PSNR score of 31.85. Visual comparisons showed clearer lip boundaries and more realistic teeth details than several baseline methods.',
          'In audio-driven experiments, FS-Talker achieved a Sync-C score of 3.634 in a representative example, outperforming several baseline methods.'
        ],
        mediaLayout: 'two-up',
        media: [
          {
            type: 'image',
            src: '../assets/images/fstalker-reconstruction.png',
            alt: 'FS-Talker self-reconstruction comparison',
            caption: 'Figure 7. Self-reconstruction comparison.'
          },
          {
            type: 'image',
            src: '../assets/images/fstalker-crosslingual.png',
            alt: 'FS-Talker cross-lingual animation results',
            caption: 'Figure 8. Cross-lingual audio-driven animation results with Sync-C scores and mouth-region close-ups.'
          }
        ]
      }
    ],
    next: { key: 'freeu', title: 'FreeU-Enhanced Stable Diffusion' }
  },

  freeu: {
    number: '03',
    title: 'FreeU-Enhanced Stable Diffusion',
    subtitle: 'Training-free, inference-time enhancement of text-to-image generation',
    sections: [
      {
        title: 'Project Overview',
        paragraphs: [
          'This project improves the images generated by Stable Diffusion 2.1 at inference time, without retraining the diffusion model or introducing additional learnable parameters. Building on FreeU, it refines U-Net feature reweighting and uses CLIP to select prompt-specific FreeU parameters, aiming to preserve global structure while producing clearer textures and more prompt-relevant details.'
        ]
      },
      {
        title: 'Technical Approach',
        paragraphs: [
          'FreeU improves diffusion generation by reweighting the backbone and skip-connection features in the U-Net decoder. Our method extends this mechanism in three ways. First, backbone channels are ranked by their spatial variance, which serves as a proxy for identifying channels dominated by low-frequency structural information. Scaling is applied to selected low-variance channels instead of a fixed channel partition. Second, the fixed Fourier-domain cutoff for skip-connection features is replaced with a resolution-aware threshold, allowing frequency suppression to adapt to different U-Net feature-map scales. Finally, for each text prompt, four candidate parameter sets are evaluated using low-cost preview images. CLIP measures the text-image similarity of each preview, and the highest-scoring parameter set is used for the final generation. The complete method operates at inference time without retraining the diffusion model.'
        ]
      },
      {
        title: 'My Contributions',
        bullets: [
          'Designed and implemented variance-guided channel selection for the FreeU backbone.',
          'Developed a resolution-aware Fourier threshold for feature maps at different U-Net scales.',
          'Implemented CLIP-guided selection of prompt-specific FreeU parameters and ran Stable Diffusion 2.1 comparisons.',
          'Conducted qualitative comparisons across prompts involving landscape textures, small objects, and complex scene composition.'
        ]
      },
      {
        title: 'Results',
        paragraphs: ['All methods use the same text prompt, random seed, and inference settings.'],
        media: [
          {
            type: 'image',
            src: '../assets/images/freeu-fantasy.png',
            alt: 'Fantasy landscape generation comparison',
            caption: 'Figure 9. Fantasy landscape generation. Our method preserves sharper mountain and vegetation textures while avoiding the over-smoothed appearance produced by FreeU.'
          },
          {
            type: 'image',
            src: '../assets/images/freeu-celebration.png',
            alt: 'Christmas celebration generation comparison',
            caption: 'Figure 10. Christmas celebration generation. Our method renders the tree ornaments as more distinguishable objects rather than blurred color blocks.'
          },
          {
            type: 'image',
            src: '../assets/images/freeu-campfire.png',
            alt: 'Snowy campfire generation comparison',
            caption: 'Figure 11. Snowy night campfire generation. Our method retains more visible stars and clearer cloud details while preserving the overall scene structure.'
          }
        ]
      },
      {
        title: 'Supplementary Comparisons',
        media: [
          {
            type: 'image',
            src: '../assets/images/freeu-landscape-labeled.png',
            alt: 'FreeU and Ours landscape comparison',
            caption: 'Our method improves style uniformity and texture consistency.'
          },
          {
            type: 'image',
            src: '../assets/images/freeu-mountain-labeled.png',
            alt: 'FreeU and Ours mountain comparison',
            caption: 'Our method produces clearer mountain reflections in the lake, enhancing visual realism.'
          },
          {
            type: 'image',
            src: '../assets/images/freeu-camera-labeled.png',
            alt: 'FreeU and Ours camera comparison',
            caption: 'Our method enhances the texture details and light and shadow transitions.'
          }
        ]
      }
    ],
    next: { key: 'medical', title: 'Anatomy-Guided 3D Medical Image Generation' }
  },

  medical: {
    number: '04',
    title: 'Anatomy-Guided 3D Medical Image Generation',
    subtitle: 'Segmentation-conditioned generation with Flow Matching',
    sections: [
      {
        title: 'Project Overview',
        paragraphs: [
          'This project studies how anatomical segmentation masks can guide the generation of 3D brain MRI volumes. The masks are added as conditions to a Flow Matching model so that generated volumes follow specified regions and spatial structures.'
        ]
      },
      {
        title: 'Technical Approach',
        paragraphs: [
          'T1-weighted MRI volumes and their corresponding segmentation masks from the MSD Brain Tumour dataset are paired, resampled to 128 cubed, and preprocessed through mask binarization and MRI intensity normalization. A 3D U-Net serves as the Flow Matching backbone and learns a time-dependent velocity field that transports Gaussian noise toward a 3D MRI volume. The segmentation mask is provided as an additional spatial condition, encouraging the generated volume to follow the mask-defined location and contour. Non-uniform timestep sampling was also explored, while the final framework uses mask conditioning as its primary structural constraint.'
        ]
      },
      {
        title: 'My Contributions',
        bullets: [
          'Prepared paired MRI-mask data, including modality extraction, mask binarization, resampling, and intensity normalization.',
          'Explored non-uniform timestep sampling and implemented the final mask-conditioned Flow Matching pipeline with a 3D U-Net.',
          'Ran training and debugging, evaluated MMD, MS-SSIM, and FID, and prepared axial, coronal, and sagittal visualizations.'
        ]
      },
      {
        title: 'Quantitative Results',
        paragraphs: [
          'Compared with the unconditional Flow Matching baseline, mask conditioning reduced MMD from 1.80 to 0.96. Inter-sample MS-SSIM decreased from 0.68 to 0.37, suggesting greater diversity among generated samples. FID increased from 12.55 to 15.92. This indicates a trade-off: mask conditioning improved distribution alignment and sample diversity in these evaluations, but did not improve FID.'
        ],
        media: [
          {
            type: 'image',
            src: '../assets/images/medical-metrics.png',
            alt: 'Quantitative comparison of unconditional and mask-conditioned generation',
            caption: 'Figure 12. Quantitative comparison between unconditional generation and mask-conditioned generation.'
          }
        ]
      },
      {
        title: 'Qualitative Results',
        media: [
          {
            type: 'image',
            src: '../assets/images/medical-volumes.png',
            alt: 'Real and generated brain MRI volumes',
            caption: 'Figure 13. Real volume on the left and generated volume on the right; columns show axial, coronal, and sagittal views.'
          }
        ]
      }
    ],
    next: { key: 'mentor', title: 'Mentor Caring System' }
  },

  mentor: {
    number: '05',
    title: 'Mentor Caring System',
    subtitle: 'A role-based web application for university student support',
    sections: [
      {
        title: 'Project Overview',
        introMedia: [
          {
            type: 'video',
            src: '../assets/video/mentor-demo.mp4',
            poster: '../assets/images/mentor-dashboard.png'
          }
        ],
        paragraphs: [
          'The Mentor Caring System is a role-based web application for coordinating university student mentoring and support. It connects six user roles: administrators, faculty consultants, mentors, coordinators, students, and supporting staff. The system centralizes student and mentor allocation, routine communication, mentoring records, appointment scheduling, special-case escalation, and administrative reporting, while restricting each role to authorized student data.'
        ]
      },
      {
        title: 'Technical Approach',
        paragraphs: [
          'The project followed an object-oriented development process covering analysis, design, implementation, and testing. Requirements were modeled with use-case, state-transition, and UML class diagrams. The design divided the system into four functional subsystems and used an MVC-style architecture to separate user interfaces, application logic, and data access.',
          'The application was implemented in Python using Flask for routing and application logic, with MySQL for persistent data storage. Role- and department-based authorization controls access for six user roles. The system was validated through black-box testing, automated functional testing with TestComplete, and load testing with LoadRunner.'
        ],
        media: [
          {
            type: 'image',
            src: '../assets/images/mentor-uml.png',
            alt: 'Mentor Caring System UML class diagram',
            caption: 'Figure 14. Simplified UML class diagram covering users and access control, university organization, communication and appointments, and mentoring records and audit logs.'
          }
        ]
      },
      {
        title: 'My Contributions',
        bullets: [
          'As team lead, translated the requirements into weekly milestones, organized meetings, assigned and reviewed tasks, and checked consistency across the requirements, UML models, interface design, and implementation.',
          'After the shared analysis and design phase, took primary responsibility for the final full-stack implementation and integration, with one teammate assisting with final refinements.',
          'Developed the Flask back end, database models, controllers, role-based access logic, data-processing functions, and HTML pages for all six roles; integrated the main workflows.'
        ]
      },
      {
        title: 'Main Functions',
        paragraphs: [
          'The completed system supports six user roles and fulfills 21 specified workflow and access-control requirements. Five representative capability groups are highlighted below.'
        ],
        subsections: [
          {
            title: 'Student and mentor-group management',
            body: 'Administrators import the university organization structure and manage programs and faculty consultants. Faculty consultants import student lists, assign students to mentor groups, change mentors, and designate coordinators.',
            mediaLayout: 'two-up',
            media: [
              { type: 'image', src: '../assets/images/mentor-import.png', alt: 'Student import interface', caption: 'Student import and validation.' },
              { type: 'image', src: '../assets/images/mentor-dashboard.png', alt: 'Student dashboard', caption: 'Student dashboard and mentor information.' }
            ]
          },
          {
            title: 'Communication and mentoring records',
            body: 'Students can contact their assigned mentor, while authorized staff communicate within their permitted scope. Each in-system message also triggers a notification to the recipient’s registered email address.',
            mediaLayout: 'two-up',
            media: [
              { type: 'image', src: '../assets/images/mentor-compose.png', alt: 'Message compose interface', caption: 'Communication with an assigned mentor.' },
              { type: 'image', src: '../assets/images/mentor-message-list.png', alt: 'Sent message list', caption: 'Communication record.' }
            ]
          },
          {
            title: 'Appointment scheduling',
            body: 'Mentors publish available 30-minute time slots, students select a suitable slot, and the confirmed appointment records its time and venue.',
            media: [
              { type: 'image', src: '../assets/images/mentor-appointment.png', alt: 'Mentor appointment availability form', caption: 'Mentor availability and candidate slots.' },
              { type: 'image', src: '../assets/images/mentor-slot-picker.png', alt: 'Student appointment slot picker', caption: 'Student appointment selection.' },
              { type: 'image', src: '../assets/images/mentor-appointment-inbox.png', alt: 'Appointment request in inbox', caption: 'Appointment confirmation workflow.' }
            ]
          },
          {
            title: 'Special-case escalation and reporting',
            body: 'Mentors forward students who require additional support to a coordinator, who can review the attached student records.',
            media: [
              { type: 'image', src: '../assets/images/mentor-escalation.png', alt: 'Special-case escalation message', caption: 'Special-case escalation to a coordinator.' }
            ]
          },
          {
            title: 'Export student interview records',
            body: 'Authorized users can export mentoring records to Word for selected students or by academic year and department.',
            media: [
              { type: 'image', src: '../assets/images/mentor-export.png', alt: 'Word export interface', caption: 'Export of selected interview records to Word.' }
            ]
          }
        ]
      }
    ],
    next: { key: 'uvavatar', title: 'UVAvatar' }
  }
};
