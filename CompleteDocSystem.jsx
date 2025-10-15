import React, { useState } from 'react';
import { ChevronDown, ChevronRight, FileText, Database, ExternalLink, BookOpen, Users, Code, Wrench, AlertCircle } from 'lucide-react';

const CompleteDocSystem = () => {
  const [expandedPhases, setExpandedPhases] = useState({});
  const [selectedStage, setSelectedStage] = useState(null);
  const [activeView, setActiveView] = useState('workflow'); // 'workflow' or 'usecases' or 'structure'
  const [filterDocType, setFilterDocType] = useState('all'); // 'all', 'internal', 'external'

  const togglePhase = (phaseId) => {
    setExpandedPhases(prev => ({
      ...prev,
      [phaseId]: !prev[phaseId]
    }));
  };

  const workflow = [
    {
      phase: "1. Discovery",
      color: "border-blue-300",
      icon: <Users className="w-5 h-5" />,
      stages: [
        {
          id: "1a",
          name: "Request",
          owner: "Customer Support / Stakeholder",
          inputs: [
            { name: "Support tickets", location: "Zendesk/Intercom" },
            { name: "Customer conversations", location: "CRM/Slack" },
            { name: "Usage analytics", location: "Analytics platform" }
          ],
          outputs: [
            { name: "Feature request log", location: "Project management tool", docType: "neither" },
            { name: "Problem statement", location: "Project management tool", docType: "neither" },
            { name: "User impact assessment", location: "Spreadsheet/Doc", docType: "neither" }
          ],
          dependencies: [],
          internalDocs: [],
          externalDocs: []
        },
        {
          id: "1b",
          name: "Triage",
          owner: "Product Manager",
          inputs: [
            { name: "Feature request log", location: "From 1a", source: "1a" },
            { name: "Problem statement", location: "From 1a", source: "1a" },
            { name: "Business strategy docs", location: "Confluence/Notion" },
            { name: "Technical feasibility input", location: "Eng Lead feedback" }
          ],
          outputs: [
            { name: "Triage notes", location: "Confluence/Notion", docType: "neither" },
            { name: "Priority assignment", location: "JIRA/Linear", docType: "neither" },
            { name: "Go/no-go decision", location: "Confluence/Notion", docType: "neither" }
          ],
          dependencies: ["1a"],
          internalDocs: [],
          externalDocs: []
        },
        {
          id: "1c",
          name: "Requirements Gathering",
          owner: "Product Manager",
          inputs: [
            { name: "Triage notes", location: "From 1b", source: "1b" },
            { name: "Priority assignment", location: "From 1b", source: "1b" },
            { name: "User research", location: "Research docs" },
            { name: "Analytics data", location: "Analytics platform" }
          ],
          outputs: [
            { name: "User stories", location: "JIRA/Linear", docType: "neither" },
            { name: "Acceptance criteria", location: "JIRA/Linear", docType: "neither" },
            { name: "Success metrics", location: "Confluence/Notion", docType: "neither" },
            { name: "User flows", location: "Figma/Miro", docType: "neither" }
          ],
          dependencies: ["1b"],
          internalDocs: [],
          externalDocs: []
        },
        {
          id: "1d",
          name: "PRD Creation",
          owner: "Product Manager",
          inputs: [
            { name: "User stories", location: "From 1c", source: "1c" },
            { name: "Acceptance criteria", location: "From 1c", source: "1c" },
            { name: "Success metrics", location: "From 1c", source: "1c" },
            { name: "Design mockups", location: "Figma" }
          ],
          outputs: [
            { name: "PRD", location: "Confluence/Notion/Google Docs", docType: "neither" },
            { name: "Success criteria", location: "PRD document", docType: "neither" },
            { name: "Risks & dependencies", location: "PRD document", docType: "neither" }
          ],
          dependencies: ["1c"],
          internalDocs: [],
          externalDocs: []
        }
      ]
    },
    {
      phase: "2. Planning",
      color: "border-purple-300",
      icon: <FileText className="w-5 h-5" />,
      stages: [
        {
          id: "2a",
          name: "Technical Design Review",
          owner: "Engineering Lead / Architect",
          inputs: [
            { name: "PRD", location: "From 1d", source: "1d" },
            { name: "Existing system diagrams", location: "Confluence/Wiki", source: "internal" },
            { name: "Existing DB schemas", location: "Confluence/Wiki", source: "internal" },
            { name: "Existing API docs", location: "Confluence/Wiki", source: "internal" }
          ],
          outputs: [
            { name: "Technical design doc", location: "Confluence/Wiki", docType: "internal" },
            { name: "ADRs (Architecture Decision Records)", location: "Confluence/Wiki/GitHub", docType: "internal" },
            { name: "API specifications", location: "Confluence/Swagger", docType: "internal" },
            { name: "Database schema changes", location: "Confluence/Wiki", docType: "internal" },
            { name: "System diagrams (updated)", location: "Confluence/Miro", docType: "internal" }
          ],
          dependencies: ["1d"],
          internalDocs: ["Technical design doc", "ADRs", "API specifications", "Database schema changes", "System diagrams"],
          externalDocs: []
        },
        {
          id: "2b",
          name: "Task Breakdown",
          owner: "Engineering Lead + Team",
          inputs: [
            { name: "Technical design doc", location: "From 2a", source: "2a" },
            { name: "ADRs", location: "From 2a", source: "2a" },
            { name: "Team velocity data", location: "JIRA/Linear" }
          ],
          outputs: [
            { name: "Work breakdown structure", location: "JIRA/Linear", docType: "neither" },
            { name: "Story point estimates", location: "JIRA/Linear", docType: "neither" },
            { name: "Sprint plan", location: "JIRA/Linear", docType: "neither" }
          ],
          dependencies: ["2a"],
          internalDocs: [],
          externalDocs: []
        },
        {
          id: "2c",
          name: "Ticket Creation",
          owner: "PM / Engineering Lead",
          inputs: [
            { name: "Work breakdown", location: "From 2b", source: "2b" },
            { name: "Technical design doc", location: "From 2a", source: "2a" },
            { name: "Acceptance criteria", location: "From 1c", source: "1c" }
          ],
          outputs: [
            { name: "JIRA/Linear tickets", location: "JIRA/Linear", docType: "neither" },
            { name: "Ticket descriptions", location: "JIRA/Linear", docType: "neither" },
            { name: "Definition of Done", location: "JIRA/Linear", docType: "neither" }
          ],
          dependencies: ["2b", "2a", "1c"],
          internalDocs: [],
          externalDocs: []
        }
      ]
    },
    {
      phase: "3. Building",
      color: "border-green-300",
      icon: <Code className="w-5 h-5" />,
      stages: [
        {
          id: "3a",
          name: "Codebase Understanding",
          owner: "Software Engineer",
          inputs: [
            { name: "Ticket", location: "From 2c", source: "2c" },
            { name: "Technical design doc", location: "From 2a", source: "2a" },
            { name: "Internal wiki", location: "Confluence/Wiki", source: "internal" },
            { name: "READMEs", location: "GitHub/GitLab", source: "internal" },
            { name: "Architecture diagrams", location: "From 2a", source: "2a" }
          ],
          outputs: [
            { name: "Personal notes", location: "Engineer's notes", docType: "neither" },
            { name: "Question log", location: "Doc/Notion", docType: "neither" },
            { name: "Slack questions", location: "Slack", docType: "neither" },
            { name: "Implementation plan", location: "Doc/Ticket", docType: "neither" }
          ],
          dependencies: ["2c", "2a"],
          internalDocs: [],
          externalDocs: []
        },
        {
          id: "3b",
          name: "Implementation",
          owner: "Software Engineer",
          inputs: [
            { name: "Ticket", location: "From 2c", source: "2c" },
            { name: "Technical design doc", location: "From 2a", source: "2a" },
            { name: "API specs", location: "From 2a", source: "2a" },
            { name: "Implementation plan", location: "From 3a", source: "3a" },
            { name: "Coding standards", location: "Wiki/GitHub", source: "internal" }
          ],
          outputs: [
            { name: "New code", location: "GitHub/GitLab", docType: "neither" },
            { name: "Unit tests", location: "GitHub/GitLab", docType: "neither" },
            { name: "Git commits", location: "GitHub/GitLab", docType: "neither" },
            { name: "Updated READMEs", location: "GitHub/GitLab", docType: "internal" },
            { name: "Code comments", location: "GitHub/GitLab", docType: "internal" },
            { name: "Migration scripts", location: "GitHub/GitLab", docType: "internal" }
          ],
          dependencies: ["2c", "2a", "3a"],
          internalDocs: ["Updated READMEs", "Code comments", "Migration scripts"],
          externalDocs: []
        },
        {
          id: "3c",
          name: "Code Review",
          owner: "Senior Engineer / Tech Lead",
          inputs: [
            { name: "New code", location: "From 3b", source: "3b" },
            { name: "Updated READMEs", location: "From 3b", source: "3b" },
            { name: "Unit tests", location: "From 3b", source: "3b" },
            { name: "Technical design doc", location: "From 2a", source: "2a" }
          ],
          outputs: [
            { name: "Pull Request", location: "GitHub/GitLab", docType: "neither" },
            { name: "PR comments", location: "GitHub/GitLab", docType: "neither" },
            { name: "Approval", location: "GitHub/GitLab", docType: "neither" },
            { name: "Code quality metrics", location: "SonarQube/CodeClimate", docType: "neither" }
          ],
          dependencies: ["3b", "2a"],
          internalDocs: [],
          externalDocs: []
        }
      ]
    },
    {
      phase: "4. Testing",
      color: "border-orange-300",
      icon: <AlertCircle className="w-5 h-5" />,
      stages: [
        {
          id: "4a",
          name: "Automated Testing",
          owner: "Software Engineer / QA",
          inputs: [
            { name: "Approved PR", location: "From 3c", source: "3c" },
            { name: "New code", location: "From 3b", source: "3b" },
            { name: "Unit tests", location: "From 3b", source: "3b" }
          ],
          outputs: [
            { name: "Test results", location: "CI/CD platform", docType: "neither" },
            { name: "Code coverage reports", location: "CI/CD platform", docType: "neither" },
            { name: "CI/CD pipeline logs", location: "Jenkins/GitHub Actions", docType: "neither" }
          ],
          dependencies: ["3c", "3b"],
          internalDocs: [],
          externalDocs: []
        },
        {
          id: "4b",
          name: "Manual QA Testing",
          owner: "QA Engineer",
          inputs: [
            { name: "Deployed code (staging)", location: "From 4a", source: "4a" },
            { name: "PRD", location: "From 1d", source: "1d" },
            { name: "Acceptance criteria", location: "From 1c", source: "1c" },
            { name: "Updated READMEs", location: "From 3b", source: "3b" }
          ],
          outputs: [
            { name: "Test execution report", location: "TestRail/JIRA", docType: "neither" },
            { name: "Bug tickets", location: "JIRA/Linear", docType: "neither" },
            { name: "Test cases", location: "TestRail/Confluence", docType: "internal" },
            { name: "QA sign-off", location: "JIRA/Confluence", docType: "neither" }
          ],
          dependencies: ["4a", "1d", "1c", "3b"],
          internalDocs: ["Test cases"],
          externalDocs: []
        },
        {
          id: "4c",
          name: "Bug Resolution",
          owner: "Software Engineer",
          inputs: [
            { name: "Bug tickets", location: "From 4b", source: "4b" },
            { name: "Test execution report", location: "From 4b", source: "4b" }
          ],
          outputs: [
            { name: "Bug fixes", location: "GitHub/GitLab", docType: "neither" },
            { name: "Updated tests", location: "GitHub/GitLab", docType: "neither" },
            { name: "Bug resolution notes", location: "JIRA/Linear", docType: "neither" }
          ],
          dependencies: ["4b"],
          internalDocs: [],
          externalDocs: [],
          note: "Loops back to 3c for review"
        },
        {
          id: "4d",
          name: "User Acceptance Testing",
          owner: "Product Manager + Stakeholders",
          inputs: [
            { name: "QA sign-off", location: "From 4b", source: "4b" },
            { name: "Working feature (staging)", location: "Staging environment" },
            { name: "PRD", location: "From 1d", source: "1d" },
            { name: "Success criteria", location: "From 1d", source: "1d" }
          ],
          outputs: [
            { name: "UAT plan", location: "Confluence/Notion", docType: "neither" },
            { name: "UAT feedback", location: "Confluence/Notion", docType: "neither" },
            { name: "Demo recording", location: "Loom/YouTube (internal)", docType: "neither" },
            { name: "UAT sign-off", location: "Confluence/Notion", docType: "neither" }
          ],
          dependencies: ["4b", "1d"],
          internalDocs: [],
          externalDocs: []
        }
      ]
    },
    {
      phase: "5. Documentation",
      color: "border-yellow-300",
      icon: <BookOpen className="w-5 h-5" />,
      stages: [
        {
          id: "5a",
          name: "Technical Documentation (Internal)",
          owner: "Software Engineer / Tech Writer",
          inputs: [
            { name: "New code", location: "From 3b", source: "3b" },
            { name: "Technical design doc", location: "From 2a", source: "2a" },
            { name: "ADRs", location: "From 2a", source: "2a" },
            { name: "API specs", location: "From 2a", source: "2a" },
            { name: "Updated READMEs", location: "From 3b", source: "3b" }
          ],
          outputs: [
            { name: "README updates", location: "GitHub/GitLab", docType: "internal" },
            { name: "API documentation", location: "Swagger/Confluence", docType: "internal" },
            { name: "Architecture docs", location: "Confluence/Wiki", docType: "internal" },
            { name: "Runbooks", location: "Confluence/PagerDuty", docType: "internal" },
            { name: "Troubleshooting guides", location: "Confluence/Wiki", docType: "internal" },
            { name: "Configuration guides", location: "Confluence/Wiki", docType: "internal" },
            { name: "How-it-works docs", location: "Confluence/Wiki", docType: "internal" }
          ],
          dependencies: ["3b", "2a"],
          internalDocs: ["README updates", "API documentation", "Architecture docs", "Runbooks", "Troubleshooting guides", "Configuration guides", "How-it-works docs"],
          externalDocs: []
        },
        {
          id: "5b",
          name: "End-User Documentation (External)",
          owner: "Technical Writer / PM",
          inputs: [
            { name: "PRD", location: "From 1d", source: "1d" },
            { name: "User stories", location: "From 1c", source: "1c" },
            { name: "UAT demo", location: "From 4d", source: "4d" },
            { name: "Screenshots/videos", location: "From testing" }
          ],
          outputs: [
            { name: "Help center articles", location: "Zendesk/Intercom/Help site", docType: "external" },
            { name: "User guides", location: "Help site/Docs site", docType: "external" },
            { name: "Tutorial videos", location: "YouTube/Help site", docType: "external" },
            { name: "Release notes", location: "Help site/Blog", docType: "external" },
            { name: "FAQ updates", location: "Help site", docType: "external" }
          ],
          dependencies: ["1d", "1c", "4d"],
          internalDocs: [],
          externalDocs: ["Help center articles", "User guides", "Tutorial videos", "Release notes", "FAQ updates"]
        },
        {
          id: "5c",
          name: "Knowledge Base Updates",
          owner: "Engineering Team / PM",
          inputs: [
            { name: "Technical docs", location: "From 5a", source: "5a" },
            { name: "User docs", location: "From 5b", source: "5b" },
            { name: "Bug resolution notes", location: "From 4c", source: "4c" },
            { name: "Question log", location: "From 3a", source: "3a" }
          ],
          outputs: [
            { name: "Internal wiki updates", location: "Confluence/Notion", docType: "internal" },
            { name: "Known issues doc", location: "Confluence/Wiki", docType: "internal" },
            { name: "Workarounds", location: "Confluence/Wiki", docType: "internal" },
            { name: "Lessons learned", location: "Confluence/Wiki", docType: "internal" }
          ],
          dependencies: ["5a", "5b", "4c", "3a"],
          internalDocs: ["Internal wiki updates", "Known issues doc", "Workarounds", "Lessons learned"],
          externalDocs: []
        }
      ]
    },
    {
      phase: "6. Deployment",
      color: "border-indigo-300",
      icon: <Wrench className="w-5 h-5" />,
      stages: [
        {
          id: "6a",
          name: "Pre-Deployment Prep",
          owner: "DevOps / SRE",
          inputs: [
            { name: "UAT sign-off", location: "From 4d", source: "4d" },
            { name: "QA sign-off", location: "From 4b", source: "4b" },
            { name: "Runbooks", location: "From 5a", source: "5a" }
          ],
          outputs: [
            { name: "Deployment plan", location: "Confluence/Wiki", docType: "internal" },
            { name: "Rollback procedures", location: "Confluence/PagerDuty", docType: "internal" },
            { name: "Deployment runbook", location: "Confluence/PagerDuty", docType: "internal" },
            { name: "Monitoring setup", location: "Grafana/Datadog", docType: "internal" }
          ],
          dependencies: ["4d", "4b", "5a"],
          internalDocs: ["Deployment plan", "Rollback procedures", "Deployment runbook", "Monitoring setup"],
          externalDocs: []
        },
        {
          id: "6b",
          name: "Deployment Execution",
          owner: "DevOps / SRE / Engineer",
          inputs: [
            { name: "Deployment plan", location: "From 6a", source: "6a" },
            { name: "Deployment runbook", location: "From 6a", source: "6a" },
            { name: "CI/CD pipeline", location: "From 4a", source: "4a" }
          ],
          outputs: [
            { name: "Deployment logs", location: "Jenkins/GitHub Actions", docType: "internal" },
            { name: "Production release", location: "Production environment", docType: "neither" },
            { name: "Deployment report", location: "Confluence/Slack", docType: "internal" }
          ],
          dependencies: ["6a", "4a"],
          internalDocs: ["Deployment logs", "Deployment report"],
          externalDocs: []
        },
        {
          id: "6c",
          name: "Launch Communications",
          owner: "PM / Product Marketing",
          inputs: [
            { name: "Successful deployment", location: "From 6b", source: "6b" },
            { name: "Release notes", location: "From 5b", source: "5b" },
            { name: "User guides", location: "From 5b", source: "5b" },
            { name: "Demo recording", location: "From 4d", source: "4d" }
          ],
          outputs: [
            { name: "Release announcement", location: "Email/Blog/In-app", docType: "external" },
            { name: "Changelog", location: "Help site/GitHub", docType: "external" },
            { name: "Internal announcement", location: "Slack/Email", docType: "neither" },
            { name: "Demo scripts", location: "Confluence/Notion", docType: "internal" },
            { name: "Training guides", location: "Confluence/Notion", docType: "internal" }
          ],
          dependencies: ["6b", "5b", "4d"],
          internalDocs: ["Demo scripts", "Training guides"],
          externalDocs: ["Release announcement", "Changelog"]
        }
      ]
    },
    {
      phase: "7. Post-Launch",
      color: "border-red-300",
      icon: <Database className="w-5 h-5" />,
      stages: [
        {
          id: "7a",
          name: "Monitoring & Observability",
          owner: "SRE / DevOps / Engineering",
          inputs: [
            { name: "Deployment logs", location: "From 6b", source: "6b" },
            { name: "Monitoring setup", location: "From 6a", source: "6a" }
          ],
          outputs: [
            { name: "Monitoring dashboards", location: "Grafana/Datadog", docType: "internal" },
            { name: "Alert definitions", location: "PagerDuty/Grafana", docType: "internal" },
            { name: "Performance reports", location: "Confluence/Dashboard", docType: "internal" },
            { name: "Error logs", location: "Splunk/ELK", docType: "internal" }
          ],
          dependencies: ["6b", "6a"],
          internalDocs: ["Monitoring dashboards", "Alert definitions", "Performance reports"],
          externalDocs: []
        },
        {
          id: "7b",
          name: "Support Enablement",
          owner: "Customer Support / Success",
          inputs: [
            { name: "User guides", location: "From 5b", source: "5b" },
            { name: "Demo scripts", location: "From 6c", source: "6c" },
            { name: "Training guides", location: "From 6c", source: "6c" },
            { name: "Known issues", location: "From 5c", source: "5c" },
            { name: "FAQ", location: "From 5b", source: "5b" }
          ],
          outputs: [
            { name: "Support KB (internal)", location: "Confluence/Zendesk", docType: "internal" },
            { name: "Support macros", location: "Zendesk/Intercom", docType: "internal" },
            { name: "Escalation procedures", location: "Confluence/Wiki", docType: "internal" }
          ],
          dependencies: ["5b", "6c", "5c"],
          internalDocs: ["Support KB (internal)", "Support macros", "Escalation procedures"],
          externalDocs: []
        },
        {
          id: "7c",
          name: "Feedback Collection",
          owner: "PM / Customer Success",
          inputs: [
            { name: "Usage analytics", location: "From 7a", source: "7a" },
            { name: "Customer feedback", location: "Support/Surveys" },
            { name: "Support ticket patterns", location: "Zendesk/Intercom" }
          ],
          outputs: [
            { name: "Feature performance report", location: "Confluence/Notion", docType: "neither" },
            { name: "User feedback summary", location: "Confluence/Notion", docType: "neither" },
            { name: "Improvement backlog", location: "JIRA/Linear", docType: "neither" },
            { name: "Bug reports", location: "JIRA/Linear", docType: "neither" }
          ],
          dependencies: ["7a"],
          internalDocs: [],
          externalDocs: [],
          note: "Feeds back to 1a (Discovery)"
        }
      ]
    }
  ];

  const useCases = [
    {
      category: "New Engineer Onboarding",
      icon: <Users className="w-5 h-5" />,
      description: "Getting a new engineer productive quickly",
      activities: [
        "Understanding system architecture",
        "Setting up local development environment",
        "Learning coding standards and practices",
        "Understanding deployment process"
      ],
      requiredDocs: [
        { name: "Architecture docs", stage: "2a, 5a" },
        { name: "System diagrams", stage: "2a" },
        { name: "README files", stage: "3b, 5a" },
        { name: "Getting started guide", stage: "5a" },
        { name: "Coding standards", stage: "3b" },
        { name: "Development setup docs", stage: "5a" },
        { name: "Deployment runbooks", stage: "6a" }
      ],
      consequence: "Without these: 2-4 week ramp-up becomes 2-3 months"
    },
    {
      category: "Incident Response",
      icon: <AlertCircle className="w-5 h-5" />,
      description: "Responding to production incidents quickly",
      activities: [
        "Understanding what broke and why",
        "Following runbooks to resolve issues",
        "Identifying system dependencies",
        "Rolling back if necessary"
      ],
      requiredDocs: [
        { name: "Runbooks", stage: "5a, 6a" },
        { name: "Architecture diagrams", stage: "2a, 5a" },
        { name: "Monitoring dashboards", stage: "7a" },
        { name: "Alert definitions", stage: "7a" },
        { name: "Rollback procedures", stage: "6a" },
        { name: "Troubleshooting guides", stage: "5a" },
        { name: "Known issues doc", stage: "5c" }
      ],
      consequence: "Without these: Minutes of downtime become hours",
      toolLink: { name: "Rootly", url: "https://rootly.com", description: "Incident management platform" }
    },
    {
      category: "Feature Development",
      icon: <Code className="w-5 h-5" />,
      description: "Building new features or modifying existing ones",
      activities: [
        "Understanding existing codebase",
        "Following API contracts",
        "Making architectural decisions",
        "Ensuring consistency with existing patterns"
      ],
      requiredDocs: [
        { name: "Technical design docs", stage: "2a" },
        { name: "API documentation", stage: "2a, 5a" },
        { name: "ADRs", stage: "2a" },
        { name: "Database schemas", stage: "2a" },
        { name: "Code comments", stage: "3b" },
        { name: "READMEs", stage: "3b, 5a" },
        { name: "Architecture docs", stage: "2a, 5a" }
      ],
      consequence: "Without these: Duplicate work, broken integrations, tech debt",
      toolLink: { name: "Greptile", url: "https://www.greptile.com/", description: "AI-powered code review and codebase understanding" }
    },
    {
      category: "Debugging & Troubleshooting",
      icon: <Wrench className="w-5 h-5" />,
      description: "Diagnosing and fixing bugs",
      activities: [
        "Understanding expected behavior",
        "Tracing through system flow",
        "Checking logs and metrics",
        "Identifying root cause"
      ],
      requiredDocs: [
        { name: "How-it-works docs", stage: "5a" },
        { name: "Architecture diagrams", stage: "2a, 5a" },
        { name: "API specs", stage: "2a, 5a" },
        { name: "Troubleshooting guides", stage: "5a" },
        { name: "Error logs", stage: "7a" },
        { name: "Monitoring dashboards", stage: "7a" },
        { name: "Code comments", stage: "3b" }
      ],
      consequence: "Without these: Days of investigation instead of hours",
      toolLink: { name: "CodeRabbit", url: "https://www.coderabbit.ai/", description: "AI-powered code review and debugging" }
    },
    {
      category: "API Integration",
      icon: <ExternalLink className="w-5 h-5" />,
      description: "Integrating with internal or external systems",
      activities: [
        "Understanding API contracts",
        "Following authentication patterns",
        "Handling errors correctly",
        "Testing integration scenarios"
      ],
      requiredDocs: [
        { name: "API documentation", stage: "2a, 5a" },
        { name: "API specs", stage: "2a" },
        { name: "Authentication guides", stage: "5a" },
        { name: "Integration examples", stage: "5a" },
        { name: "Error handling docs", stage: "5a" }
      ],
      consequence: "Without these: Broken integrations, security issues, wasted time"
    },
    {
      category: "Testing & QA",
      icon: <AlertCircle className="w-5 h-5" />,
      description: "Creating test plans and validating features",
      activities: [
        "Understanding expected behavior",
        "Creating comprehensive test cases",
        "Validating edge cases",
        "Regression testing"
      ],
      requiredDocs: [
        { name: "PRD", stage: "1d" },
        { name: "Acceptance criteria", stage: "1c" },
        { name: "Technical design doc", stage: "2a" },
        { name: "Test cases", stage: "4b" },
        { name: "Known issues", stage: "5c" },
        { name: "API specs", stage: "2a, 5a" }
      ],
      consequence: "Without these: Incomplete testing, bugs in production",
      toolLink: { name: "Autonama", url: "https://www.getautonama.com/", description: "Automated testing platform" }
    },
    {
      category: "Customer Support",
      icon: <Users className="w-5 h-5" />,
      description: "Helping customers resolve issues",
      activities: [
        "Answering product questions",
        "Troubleshooting customer issues",
        "Creating workarounds",
        "Escalating to engineering when needed"
      ],
      requiredDocs: [
        { name: "User guides", stage: "5b" },
        { name: "Help center articles", stage: "5b" },
        { name: "FAQ", stage: "5b" },
        { name: "Support KB", stage: "7b" },
        { name: "Known issues", stage: "5c" },
        { name: "Workarounds", stage: "5c" },
        { name: "Escalation procedures", stage: "7b" }
      ],
      consequence: "Without these: Poor customer experience, ticket backlog"
    },
    {
      category: "System Operations",
      icon: <Database className="w-5 h-5" />,
      description: "Day-to-day operational tasks",
      activities: [
        "Deploying code changes",
        "Monitoring system health",
        "Performing maintenance tasks",
        "Managing configurations"
      ],
      requiredDocs: [
        { name: "Deployment runbooks", stage: "6a" },
        { name: "Rollback procedures", stage: "6a" },
        { name: "Monitoring dashboards", stage: "7a" },
        { name: "Alert definitions", stage: "7a" },
        { name: "Configuration guides", stage: "5a" },
        { name: "Troubleshooting guides", stage: "5a" }
      ],
      consequence: "Without these: Risky deployments, system instability"
    },
    {
      category: "Product Planning",
      icon: <FileText className="w-5 h-5" />,
      description: "Planning future features and improvements",
      activities: [
        "Understanding current capabilities",
        "Identifying technical constraints",
        "Estimating effort",
        "Planning integrations"
      ],
      requiredDocs: [
        { name: "Architecture docs", stage: "2a, 5a" },
        { name: "Technical design docs", stage: "2a" },
        { name: "ADRs", stage: "2a" },
        { name: "API documentation", stage: "2a, 5a" },
        { name: "Known limitations", stage: "5c" },
        { name: "Performance reports", stage: "7a" }
      ],
      consequence: "Without these: Unrealistic plans, scope creep, tech debt"
    },
    {
      category: "Security & Compliance",
      icon: <AlertCircle className="w-5 h-5" />,
      description: "Ensuring security and meeting compliance requirements",
      activities: [
        "Understanding security architecture",
        "Conducting security reviews",
        "Responding to security incidents",
        "Audit preparation"
      ],
      requiredDocs: [
        { name: "Architecture docs", stage: "2a, 5a" },
        { name: "Security documentation", stage: "2a, 5a" },
        { name: "Access control docs", stage: "5a" },
        { name: "Audit logs", stage: "7a" },
        { name: "Incident response procedures", stage: "5a" }
      ],
      consequence: "Without these: Security vulnerabilities, compliance failures"
    }
  ];

  const getFilteredStages = () => {
    if (filterDocType === 'all') return workflow;
    
    return workflow.map(phase => ({
      ...phase,
      stages: phase.stages.filter(stage => {
        if (filterDocType === 'internal') {
          return stage.internalDocs.length > 0;
        } else if (filterDocType === 'external') {
          return stage.externalDocs.length > 0;
        }
        return true;
      })
    })).filter(phase => phase.stages.length > 0);
  };

  const StageCard = ({ stage, phaseColor }) => {
    const hasInternalDocs = stage.internalDocs.length > 0;
    const hasExternalDocs = stage.externalDocs.length > 0;
    
    return (
      <div
        onClick={() => setSelectedStage(stage)}
        className={`bg-white border-2 ${phaseColor} rounded-lg p-4 cursor-pointer hover:shadow-lg transition-all`}
      >
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-mono bg-slate-200 px-2 py-1 rounded font-semibold">
                {stage.id}
              </span>
              <h3 className="font-bold text-slate-800">{stage.name}</h3>
            </div>
            <p className="text-sm text-slate-600">{stage.owner}</p>
          </div>
          <div className="flex gap-1">
            {hasInternalDocs && (
              <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded font-medium">
                Internal
              </span>
            )}
            {hasExternalDocs && (
              <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded font-medium">
                External
              </span>
            )}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 text-xs">
          <div>
            <p className="font-semibold text-slate-700 mb-1 flex items-center gap-1">
              <Database className="w-3 h-3" /> Inputs: {stage.inputs.length}
            </p>
          </div>
          <div>
            <p className="font-semibold text-slate-700 mb-1 flex items-center gap-1">
              <FileText className="w-3 h-3" /> Outputs: {stage.outputs.length}
            </p>
          </div>
        </div>

        {stage.note && (
          <div className="mt-2 text-xs text-amber-700 bg-amber-50 px-2 py-1 rounded">
            ⚠️ {stage.note}
          </div>
        )}
      </div>
    );
  };

  const DetailModal = ({ stage, onClose }) => {
    if (!stage) return null;

    return (
      <div 
        className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
        onClick={onClose}
      >
        <div 
          className="bg-white rounded-lg p-6 max-w-4xl w-full max-h-[85vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-start justify-between mb-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-sm font-mono bg-slate-200 px-3 py-1 rounded font-semibold">
                  {stage.id}
                </span>
                <h2 className="text-2xl font-bold text-slate-800">{stage.name}</h2>
              </div>
              <p className="text-slate-600">Owner: <span className="font-medium">{stage.owner}</span></p>
            </div>
            <button 
              onClick={onClose}
              className="text-slate-400 hover:text-slate-600 text-3xl leading-none"
            >
              ×
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <h3 className="font-bold text-slate-800 mb-3 flex items-center gap-2">
                  <Database className="w-4 h-4" />
                  Inputs ({stage.inputs.length})
                </h3>
                <div className="space-y-2">
                  {stage.inputs.map((input, i) => (
                    <div key={i} className="bg-slate-50 p-2 rounded text-sm">
                      <div className="font-medium text-slate-800">{input.name}</div>
                      <div className="text-xs text-slate-600 mt-1">
                        📍 {input.location}
                        {input.source && (
                          <span className="ml-2 text-blue-600">← from {input.source}</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {stage.dependencies.length > 0 && (
                <div>
                  <h3 className="font-bold text-slate-800 mb-2">Dependencies</h3>
                  <div className="flex flex-wrap gap-2">
                    {stage.dependencies.map((dep, i) => (
                      <span key={i} className="px-2 py-1 bg-orange-100 text-orange-700 text-xs rounded font-mono">
                        {dep}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div>
              <h3 className="font-bold text-slate-800 mb-3 flex items-center gap-2">
                <FileText className="w-4 h-4" />
                Outputs ({stage.outputs.length})
              </h3>
              <div className="space-y-2">
                {stage.outputs.map((output, i) => (
                  <div key={i} className="bg-slate-50 p-2 rounded text-sm">
                    <div className="flex items-start justify-between">
                      <div className="font-medium text-slate-800">{output.name}</div>
                      {output.docType === 'internal' && (
                        <span className="px-2 py-0.5 bg-blue-100 text-blue-700 text-xs rounded shrink-0 ml-2">
                          Internal
                        </span>
                      )}
                      {output.docType === 'external' && (
                        <span className="px-2 py-0.5 bg-green-100 text-green-700 text-xs rounded shrink-0 ml-2">
                          External
                        </span>
                      )}
                    </div>
                    <div className="text-xs text-slate-600 mt-1">
                      📍 {output.location}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {(stage.internalDocs.length > 0 || stage.externalDocs.length > 0) && (
            <div className="mt-6 pt-6 border-t border-slate-200">
              <h3 className="font-bold text-slate-800 mb-3">Documentation Created</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {stage.internalDocs.length > 0 && (
                  <div>
                    <h4 className="font-semibold text-sm text-blue-700 mb-2">Internal Technical Docs</h4>
                    <ul className="space-y-1">
                      {stage.internalDocs.map((doc, i) => (
                        <li key={i} className="text-sm text-slate-700">• {doc}</li>
                      ))}
                    </ul>
                  </div>
                )}
                {stage.externalDocs.length > 0 && (
                  <div>
                    <h4 className="font-semibold text-sm text-green-700 mb-2">External User Docs</h4>
                    <ul className="space-y-1">
                      {stage.externalDocs.map((doc, i) => (
                        <li key={i} className="text-sm text-slate-700">• {doc}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  const UseCasesView = () => (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-lg p-6">
        <h2 className="text-2xl font-bold text-slate-800 mb-2">What Internal Technical Documentation Enables</h2>
        <p className="text-slate-600">
          Understanding the impact of good documentation through real-world use cases
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {useCases.map((useCase, idx) => (
          <div key={idx} className="bg-white border-2 border-slate-200 rounded-lg p-5 hover:shadow-lg transition-shadow">
            <div className="flex items-start gap-3 mb-4">
              <div className="p-2 bg-blue-100 rounded-lg">
                {useCase.icon}
              </div>
              <div>
                <h3 className="font-bold text-lg text-slate-800">{useCase.category}</h3>
                <p className="text-sm text-slate-600 mt-1">{useCase.description}</p>
              </div>
            </div>

            <div className="mb-4">
              <h4 className="font-semibold text-sm text-slate-700 mb-2">Key Activities:</h4>
              <ul className="space-y-1">
                {useCase.activities.map((activity, i) => (
                  <li key={i} className="text-sm text-slate-600">• {activity}</li>
                ))}
              </ul>
            </div>

            <div className="mb-4">
              <h4 className="font-semibold text-sm text-slate-700 mb-2">Required Documentation:</h4>
              <div className="space-y-1">
                {useCase.requiredDocs.map((doc, i) => (
                  <div key={i} className="flex items-start justify-between text-sm bg-slate-50 p-2 rounded">
                    <span className="text-slate-700">{doc.name}</span>
                    <span className="text-xs text-slate-500 font-mono ml-2 shrink-0">
                      {doc.stage}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-3 border-t border-slate-200">
              <p className="text-sm font-medium text-red-600 mb-3">
                ⚠️ {useCase.consequence}
              </p>
              {useCase.toolLink && (
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-slate-600">Tool:</span>
                  <a 
                    href={useCase.toolLink.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded hover:bg-blue-100 transition-colors"
                  >
                    <ExternalLink className="w-3 h-3" />
                    {useCase.toolLink.name}
                  </a>
                  <span className="text-xs text-slate-500">- {useCase.toolLink.description}</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const StructureView = () => {
    const docStructure = [
      {
        category: "📁 Repository-Level Documentation",
        location: "In each code repository (GitHub/GitLab)",
        sections: [
          {
            title: "README.md (Root)",
            required: true,
            content: [
              "Project name and one-line description",
              "What this service/component does (purpose)",
              "Prerequisites (languages, tools, versions)",
              "Quick start guide (getting it running locally)",
              "Environment variables table",
              "How to run tests",
              "How to build/deploy",
              "Links to more detailed docs",
              "Troubleshooting common issues",
              "Contributing guidelines"
            ],
            example: `# Payment Service
A microservice handling payment processing via Stripe

## Prerequisites
- Node.js 18+
- PostgreSQL 14+
- Redis 6+

## Quick Start
\`\`\`bash
npm install
cp .env.example .env
npm run dev
\`\`\`

## Environment Variables
| Variable | Description | Example |
|----------|-------------|---------|
| DATABASE_URL | Postgres connection | postgres://... |
| STRIPE_KEY | Stripe API key | sk_test_... |`
          },
          {
            title: "/docs folder",
            required: true,
            content: [
              "Architecture.md - System design and component interaction",
              "API.md - Endpoint specifications and examples",
              "Database.md - Schema, migrations, indexing strategy",
              "Development.md - Local setup, debugging tips",
              "Deployment.md - How to deploy, rollback procedures",
              "Testing.md - Test strategy, how to write tests"
            ]
          },
          {
            title: "Code Comments",
            required: true,
            content: [
              "Complex business logic explanations",
              "Why a certain approach was taken (not what it does)",
              "Known limitations or edge cases",
              "TODO/FIXME with context and priority",
              "Function/class documentation (JSDoc, docstrings, etc.)"
            ]
          }
        ]
      },
      {
        category: "🏛️ Architecture Documentation",
        location: "Central wiki (Confluence, Notion, etc.)",
        sections: [
          {
            title: "System Overview",
            required: true,
            content: [
              "High-level architecture diagram (all services)",
              "Technology stack (languages, frameworks, databases)",
              "Service boundaries and responsibilities",
              "Data flow between services",
              "External dependencies (third-party APIs)",
              "Deployment architecture (cloud resources)"
            ]
          },
          {
            title: "Component Deep Dives",
            required: true,
            content: [
              "Per-service architecture diagrams",
              "How components interact within a service",
              "Database schema with relationships (ERD)",
              "Message queue topics and consumers",
              "Caching strategy",
              "Authentication/authorization flow"
            ]
          },
          {
            title: "Architecture Decision Records (ADRs)",
            required: true,
            content: [
              "Title: Short noun phrase",
              "Status: Proposed/Accepted/Deprecated/Superseded",
              "Context: The issue motivating this decision",
              "Decision: The change we're proposing or have agreed to",
              "Consequences: What becomes easier or harder",
              "Date and author"
            ],
            example: `# ADR-015: Use PostgreSQL for Analytics Data

**Status:** Accepted
**Date:** 2024-10-15
**Author:** Engineering Team

## Context
We need to store and query large amounts of analytics data...

## Decision
We will use PostgreSQL with TimescaleDB extension...

## Consequences
✅ Better SQL query support
✅ Easier for analysts
❌ More expensive than NoSQL`
          }
        ]
      },
      {
        category: "🔌 API Documentation",
        location: "Swagger/OpenAPI spec + Wiki",
        sections: [
          {
            title: "API Reference",
            required: true,
            content: [
              "Base URL and versioning strategy",
              "Authentication methods (API keys, OAuth, JWT)",
              "Common headers and their purpose",
              "Rate limiting rules",
              "Pagination strategy",
              "Error response format and codes",
              "Per-endpoint documentation with examples"
            ]
          },
          {
            title: "Per Endpoint",
            required: true,
            content: [
              "HTTP method and path",
              "Purpose/description",
              "Authentication requirements",
              "Request parameters (path, query, body)",
              "Request body schema with field descriptions",
              "Response schema with field descriptions",
              "Example request (curl, code snippets)",
              "Example responses (success and error cases)",
              "Status codes and their meanings"
            ]
          }
        ]
      },
      {
        category: "🗄️ Database Documentation",
        location: "Wiki + dbdocs or similar",
        sections: [
          {
            title: "Schema Documentation",
            required: true,
            content: [
              "Entity Relationship Diagram (ERD)",
              "Table purposes and relationships",
              "Per-table column descriptions",
              "Data types and constraints",
              "Indexes and their purpose",
              "Foreign key relationships",
              "Triggers and stored procedures"
            ]
          },
          {
            title: "Migration Strategy",
            required: true,
            content: [
              "How to create migrations",
              "Migration naming conventions",
              "Rollback procedures",
              "Data migration patterns",
              "Zero-downtime migration strategies"
            ]
          },
          {
            title: "Performance",
            required: true,
            content: [
              "Query optimization tips",
              "Index usage guidelines",
              "Slow query log and monitoring",
              "Partitioning strategy (if applicable)",
              "Backup and restore procedures"
            ]
          }
        ]
      },
      {
        category: "⚙️ Operational Documentation",
        location: "Wiki + Runbook platform (PagerDuty, etc.)",
        sections: [
          {
            title: "Runbooks",
            required: true,
            content: [
              "Title: Clear description of the procedure",
              "When to use this runbook",
              "Prerequisites and permissions needed",
              "Step-by-step instructions (numbered)",
              "Expected outcomes at each step",
              "How to verify success",
              "Rollback procedure",
              "Who to contact if issues arise"
            ],
            example: `# Runbook: Deploy Payment Service

## When to Use
When deploying a new version of payment-service to production

## Prerequisites
- kubectl access to prod cluster
- GitHub release created

## Steps
1. Verify staging deployment succeeded
   - Check: https://staging.example.com/health
   - Expected: {"status": "ok"}

2. Create deployment in prod...`
          },
          {
            title: "Deployment Procedures",
            required: true,
            content: [
              "Pre-deployment checklist",
              "Deployment steps (automated and manual)",
              "Health check procedures",
              "Rollback procedures",
              "Post-deployment verification",
              "Communication plan (who to notify)"
            ]
          },
          {
            title: "Monitoring & Alerts",
            required: true,
            content: [
              "What metrics we monitor and why",
              "Alert thresholds and their rationale",
              "Dashboard locations and purposes",
              "Log aggregation setup",
              "How to interpret alerts",
              "SLIs/SLOs/SLAs definitions"
            ]
          }
        ]
      },
      {
        category: "🔧 Troubleshooting Documentation",
        location: "Wiki",
        sections: [
          {
            title: "Common Issues & Solutions",
            required: true,
            content: [
              "Symptom: What the user/system sees",
              "Cause: Why this happens",
              "Solution: Step-by-step fix",
              "Prevention: How to avoid in the future",
              "Related issues and docs"
            ],
            example: `## Database Connection Timeouts

**Symptom:** Application logs show "connection timeout" errors

**Cause:** Connection pool exhausted due to long-running queries

**Solution:**
1. Identify long-running queries: \`SELECT * FROM pg_stat_activity...\`
2. Kill problematic queries: \`SELECT pg_terminate_backend(pid)...\`
3. Increase connection pool size in config.yaml

**Prevention:** Add query timeout limits in application code`
          },
          {
            title: "Debug Guides",
            required: true,
            content: [
              "How to access logs (where, what tools)",
              "How to trace requests through the system",
              "Common debugging tools and techniques",
              "How to reproduce issues locally",
              "Performance profiling procedures"
            ]
          },
          {
            title: "Known Issues & Limitations",
            required: true,
            content: [
              "Current system limitations",
              "Known bugs and workarounds",
              "Browser/platform compatibility issues",
              "Scale limitations (max users, requests, etc.)",
              "Planned fixes and timeline"
            ]
          }
        ]
      },
      {
        category: "🎓 Onboarding Documentation",
        location: "Wiki",
        sections: [
          {
            title: "New Engineer Onboarding",
            required: true,
            content: [
              "Company tech stack overview",
              "How to get access to tools and systems",
              "Development environment setup (detailed)",
              "Architecture overview (start here)",
              "Code organization and conventions",
              "Git workflow and PR process",
              "Testing philosophy and practices",
              "Deployment process overview",
              "Who to ask for help (team contacts)"
            ]
          },
          {
            title: "Getting Started Guides",
            required: true,
            content: [
              "Your first week checklist",
              "How to pick up your first ticket",
              "How to run the system locally",
              "How to make your first contribution",
              "Common beginner mistakes to avoid"
            ]
          }
        ]
      },
      {
        category: "🔒 Security Documentation",
        location: "Secure wiki (restricted access)",
        sections: [
          {
            title: "Security Architecture",
            required: true,
            content: [
              "Authentication mechanisms",
              "Authorization model (roles, permissions)",
              "Data encryption (at rest and in transit)",
              "Secret management (where, how to rotate)",
              "Network security (VPCs, firewalls)",
              "Third-party security integrations"
            ]
          },
          {
            title: "Security Procedures",
            required: true,
            content: [
              "How to report a security issue",
              "Incident response playbook",
              "How to rotate secrets/credentials",
              "Security review checklist for PRs",
              "Compliance requirements (SOC2, GDPR, etc.)"
            ]
          }
        ]
      },
      {
        category: "📝 Process Documentation",
        location: "Wiki",
        sections: [
          {
            title: "Development Workflows",
            required: true,
            content: [
              "Git branching strategy (gitflow, trunk-based, etc.)",
              "PR review process and standards",
              "Code review checklist",
              "Testing requirements before merge",
              "CI/CD pipeline documentation"
            ]
          },
          {
            title: "Release Process",
            required: true,
            content: [
              "Release cadence (weekly, bi-weekly, etc.)",
              "How to create a release",
              "Release checklist",
              "Hotfix procedures",
              "Communication process for releases"
            ]
          },
          {
            title: "Incident Management",
            required: true,
            content: [
              "Severity definitions (P0, P1, P2, etc.)",
              "On-call rotation and responsibilities",
              "Incident response process",
              "Post-incident review (postmortem) template",
              "Escalation procedures"
            ]
          }
        ]
      }
    ];

    const bestPractices = [
      {
        practice: "Keep it Close to Code",
        description: "READMEs and code-level docs should live in the repository, not a separate wiki",
        why: "Developers see docs when they see code, docs stay in sync with code changes"
      },
      {
        practice: "Document the 'Why', Not Just the 'What'",
        description: "Code shows what it does, documentation should explain why decisions were made",
        why: "Future developers need context to make good decisions"
      },
      {
        practice: "Use Templates",
        description: "Create templates for ADRs, runbooks, postmortems, API docs, etc.",
        why: "Consistency makes docs easier to find and use, reduces cognitive load"
      },
      {
        practice: "Make Documentation Discoverable",
        description: "Clear hierarchy, good search, prominent links from multiple entry points",
        why: "Documentation that can't be found might as well not exist"
      },
      {
        practice: "Treat Docs as Code",
        description: "Review documentation changes, version control, update with code changes",
        why: "Outdated documentation is worse than no documentation"
      },
      {
        practice: "Include Examples Everywhere",
        description: "API calls, configuration files, command outputs, error messages",
        why: "Examples are often the fastest way to understand something"
      },
      {
        practice: "Document What's NOT Supported",
        description: "Known limitations, edge cases, intentional design decisions",
        why: "Prevents confusion and repeated questions about why X doesn't work"
      },
      {
        practice: "Maintain a Single Source of Truth",
        description: "Don't duplicate information across multiple docs",
        why: "Duplicates get out of sync and create confusion about which is correct"
      },
      {
        practice: "Update Docs in the Same PR",
        description: "Code changes and documentation changes should happen together",
        why: "Prevents docs from falling behind, makes doc updates part of the culture"
      },
      {
        practice: "Regular Documentation Audits",
        description: "Quarterly review to find outdated, missing, or unclear documentation",
        why: "Documentation naturally decays without active maintenance"
      }
    ];

    return (
      <div className="space-y-6">
        <div className="bg-gradient-to-r from-purple-50 to-pink-50 border-2 border-purple-200 rounded-lg p-6">
          <h2 className="text-2xl font-bold text-slate-800 mb-2">
            Internal Documentation Structure & Best Practices
          </h2>
          <p className="text-slate-600">
            A comprehensive guide to organizing and maintaining technical documentation
          </p>
        </div>

        {/* Canonical Documentation Index */}
        <div className="bg-white border-2 border-slate-200 rounded-lg p-6">
          <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
            📚 Canonical Documentation Index
          </h3>
          <p className="text-sm text-slate-600 mb-6">
            Complete hierarchical structure of all documentation types, organized by location and purpose
          </p>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            {/* Repository Level */}
            <div className="space-y-4">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-bold text-blue-800 mb-3 flex items-center gap-2">
                  📁 Repository Level (Per Codebase)
                </h4>
                <div className="space-y-2 text-sm">
                  <div className="pl-4 border-l-2 border-blue-300">
                    <div className="font-semibold text-slate-800">README.md</div>
                    <div className="text-slate-600 text-xs">Project overview, quick start, basic info</div>
                  </div>
                  <div className="pl-4 border-l-2 border-blue-300">
                    <div className="font-semibold text-slate-800">/docs/ folder</div>
                    <div className="text-slate-600 text-xs pl-4 space-y-1">
                      <div>• Architecture.md</div>
                      <div>• API.md</div>
                      <div>• Database.md</div>
                      <div>• Development.md</div>
                      <div>• Deployment.md</div>
                      <div>• Testing.md</div>
                    </div>
                  </div>
                  <div className="pl-4 border-l-2 border-blue-300">
                    <div className="font-semibold text-slate-800">Code Comments</div>
                    <div className="text-slate-600 text-xs">Inline documentation, JSDoc, docstrings</div>
                  </div>
                </div>
              </div>

              {/* Central Wiki */}
              <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                <h4 className="font-bold text-purple-800 mb-3 flex items-center gap-2">
                  🏛️ Central Wiki (Company-wide)
                </h4>
                <div className="space-y-2 text-sm">
                  <div className="pl-4 border-l-2 border-purple-300">
                    <div className="font-semibold text-slate-800">System Architecture</div>
                    <div className="text-slate-600 text-xs pl-4 space-y-1">
                      <div>• High-level diagrams</div>
                      <div>• Service boundaries</div>
                      <div>• Data flow maps</div>
                      <div>• Technology stack</div>
                    </div>
                  </div>
                  <div className="pl-4 border-l-2 border-purple-300">
                    <div className="font-semibold text-slate-800">ADRs (Architecture Decision Records)</div>
                    <div className="text-slate-600 text-xs">Decision history, context, consequences</div>
                  </div>
                  <div className="pl-4 border-l-2 border-purple-300">
                    <div className="font-semibold text-slate-800">Component Deep Dives</div>
                    <div className="text-slate-600 text-xs">Per-service architecture, ERDs, auth flows</div>
                  </div>
                </div>
              </div>
            </div>

            {/* API & Database */}
            <div className="space-y-4">
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <h4 className="font-bold text-green-800 mb-3 flex items-center gap-2">
                  🔌 API & Integration Docs
                </h4>
                <div className="space-y-2 text-sm">
                  <div className="pl-4 border-l-2 border-green-300">
                    <div className="font-semibold text-slate-800">API Reference</div>
                    <div className="text-slate-600 text-xs pl-4 space-y-1">
                      <div>• OpenAPI/Swagger specs</div>
                      <div>• Authentication methods</div>
                      <div>• Rate limiting rules</div>
                      <div>• Error response formats</div>
                    </div>
                  </div>
                  <div className="pl-4 border-l-2 border-green-300">
                    <div className="font-semibold text-slate-800">Endpoint Documentation</div>
                    <div className="text-slate-600 text-xs">Request/response examples, status codes</div>
                  </div>
                </div>
              </div>

              <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                <h4 className="font-bold text-orange-800 mb-3 flex items-center gap-2">
                  🗄️ Database Documentation
                </h4>
                <div className="space-y-2 text-sm">
                  <div className="pl-4 border-l-2 border-orange-300">
                    <div className="font-semibold text-slate-800">Schema Documentation</div>
                    <div className="text-slate-600 text-xs pl-4 space-y-1">
                      <div>• Entity Relationship Diagrams</div>
                      <div>• Table descriptions</div>
                      <div>• Column definitions</div>
                      <div>• Indexes and constraints</div>
                    </div>
                  </div>
                  <div className="pl-4 border-l-2 border-orange-300">
                    <div className="font-semibold text-slate-800">Migration & Performance</div>
                    <div className="text-slate-600 text-xs">Migration procedures, optimization guides</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Operations */}
            <div className="space-y-4">
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <h4 className="font-bold text-red-800 mb-3 flex items-center gap-2">
                  ⚙️ Operational Documentation
                </h4>
                <div className="space-y-2 text-sm">
                  <div className="pl-4 border-l-2 border-red-300">
                    <div className="font-semibold text-slate-800">Runbooks</div>
                    <div className="text-slate-600 text-xs pl-4 space-y-1">
                      <div>• Deployment procedures</div>
                      <div>• Incident response</div>
                      <div>• Maintenance tasks</div>
                      <div>• Rollback procedures</div>
                    </div>
                  </div>
                  <div className="pl-4 border-l-2 border-red-300">
                    <div className="font-semibold text-slate-800">Monitoring & Alerts</div>
                    <div className="text-slate-600 text-xs">Dashboard configs, alert definitions, SLIs/SLOs</div>
                  </div>
                </div>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <h4 className="font-bold text-yellow-800 mb-3 flex items-center gap-2">
                  🔧 Troubleshooting & Support
                </h4>
                <div className="space-y-2 text-sm">
                  <div className="pl-4 border-l-2 border-yellow-300">
                    <div className="font-semibold text-slate-800">Common Issues & Solutions</div>
                    <div className="text-slate-600 text-xs">Symptom-cause-solution format</div>
                  </div>
                  <div className="pl-4 border-l-2 border-yellow-300">
                    <div className="font-semibold text-slate-800">Debug Guides</div>
                    <div className="text-slate-600 text-xs">Log access, tracing, profiling procedures</div>
                  </div>
                  <div className="pl-4 border-l-2 border-yellow-300">
                    <div className="font-semibold text-slate-800">Known Issues & Limitations</div>
                    <div className="text-slate-600 text-xs">Current bugs, workarounds, planned fixes</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Team & Process */}
            <div className="space-y-4">
              <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4">
                <h4 className="font-bold text-indigo-800 mb-3 flex items-center gap-2">
                  🎓 Onboarding & Team Docs
                </h4>
                <div className="space-y-2 text-sm">
                  <div className="pl-4 border-l-2 border-indigo-300">
                    <div className="font-semibold text-slate-800">New Engineer Onboarding</div>
                    <div className="text-slate-600 text-xs pl-4 space-y-1">
                      <div>• Tech stack overview</div>
                      <div>• Environment setup</div>
                      <div>• First week checklist</div>
                      <div>• Team contacts</div>
                    </div>
                  </div>
                  <div className="pl-4 border-l-2 border-indigo-300">
                    <div className="font-semibold text-slate-800">Getting Started Guides</div>
                    <div className="text-slate-600 text-xs">First contribution, common mistakes</div>
                  </div>
                </div>
              </div>

              <div className="bg-pink-50 border border-pink-200 rounded-lg p-4">
                <h4 className="font-bold text-pink-800 mb-3 flex items-center gap-2">
                  📝 Process Documentation
                </h4>
                <div className="space-y-2 text-sm">
                  <div className="pl-4 border-l-2 border-pink-300">
                    <div className="font-semibold text-slate-800">Development Workflows</div>
                    <div className="text-slate-600 text-xs pl-4 space-y-1">
                      <div>• Git branching strategy</div>
                      <div>• PR review process</div>
                      <div>• Code review checklist</div>
                      <div>• CI/CD pipeline docs</div>
                    </div>
                  </div>
                  <div className="pl-4 border-l-2 border-pink-300">
                    <div className="font-semibold text-slate-800">Release & Incident Management</div>
                    <div className="text-slate-600 text-xs">Release process, incident response, postmortems</div>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                <h4 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
                  🔒 Security Documentation
                </h4>
                <div className="space-y-2 text-sm">
                  <div className="pl-4 border-l-2 border-gray-300">
                    <div className="font-semibold text-slate-800">Security Architecture</div>
                    <div className="text-slate-600 text-xs">Auth mechanisms, encryption, secret management</div>
                  </div>
                  <div className="pl-4 border-l-2 border-gray-300">
                    <div className="font-semibold text-slate-800">Security Procedures</div>
                    <div className="text-slate-600 text-xs">Incident response, compliance requirements</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Documentation Hierarchy Summary */}
          <div className="mt-6 pt-6 border-t border-slate-200">
            <h4 className="font-bold text-slate-800 mb-3">📊 Documentation Hierarchy</h4>
            <div className="bg-slate-50 rounded-lg p-4">
              <div className="text-sm space-y-2">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 bg-blue-500 rounded"></span>
                  <span className="font-semibold">Repository Level:</span>
                  <span className="text-slate-600">Code-specific, version-controlled with code</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 bg-purple-500 rounded"></span>
                  <span className="font-semibold">Central Wiki:</span>
                  <span className="text-slate-600">Cross-team, architectural decisions, system-wide</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 bg-green-500 rounded"></span>
                  <span className="font-semibold">API/Database:</span>
                  <span className="text-slate-600">Integration contracts, data schemas</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 bg-red-500 rounded"></span>
                  <span className="font-semibold">Operations:</span>
                  <span className="text-slate-600">Production procedures, incident response</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 bg-indigo-500 rounded"></span>
                  <span className="font-semibold">Team/Process:</span>
                  <span className="text-slate-600">Onboarding, workflows, team practices</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Standard Documentation Templates */}
        <div className="bg-white border-2 border-slate-200 rounded-lg p-6">
          <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
            📋 Standard Documentation Templates
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* README Template */}
            <div className="border border-slate-200 rounded-lg p-4">
              <h4 className="font-bold text-slate-800 mb-3">📄 README.md Template</h4>
              <pre className="bg-slate-900 text-slate-100 p-3 rounded text-xs overflow-x-auto mb-3">
{`# [Service Name]
Brief one-line description of what this service does

## Overview
- **Purpose**: What problem this solves
- **Owner**: Team responsible
- **Status**: Production/Beta/Deprecated

## Quick Start
\`\`\`bash
# Prerequisites
npm install
cp .env.example .env

# Run locally
npm run dev
\`\`\`

## Architecture
- **Tech Stack**: Node.js, PostgreSQL, Redis
- **Dependencies**: [List key services]
- **Deployment**: Docker + Kubernetes

## Environment Variables
| Variable | Description | Required | Example |
|----------|-------------|----------|---------|
| DATABASE_URL | Postgres connection | Yes | postgres://... |
| API_KEY | External service key | Yes | abc123... |

## Development
- **Setup**: See /docs/development.md
- **Testing**: \`npm test\`
- **Debugging**: See /docs/debugging.md

## API Documentation
- **Swagger**: http://localhost:3000/docs
- **Postman**: /docs/api-collection.json

## Deployment
- **Staging**: Automatic on merge to main
- **Production**: Manual via GitHub Actions
- **Rollback**: See /docs/deployment.md

## Support
- **On-call**: @team-backend
- **Runbooks**: /docs/runbooks/
- **Monitoring**: [Dashboard Link]`}
              </pre>
            </div>

            {/* ADR Template */}
            <div className="border border-slate-200 rounded-lg p-4">
              <h4 className="font-bold text-slate-800 mb-3">🏛️ ADR Template</h4>
              <pre className="bg-slate-900 text-slate-100 p-3 rounded text-xs overflow-x-auto mb-3">
{`# ADR-XXX: [Short Decision Title]

**Status:** Proposed | Accepted | Deprecated | Superseded
**Date:** YYYY-MM-DD
**Author:** [Name]
**Reviewers:** [Names]

## Context
What is the issue that we're seeing that is motivating this decision or change?

## Decision
What is the change that we're proposing or have agreed to implement?

## Consequences
What becomes easier or more difficult to do and any risks introduced by this change?

### Positive
- ✅ Benefit 1
- ✅ Benefit 2

### Negative  
- ❌ Drawback 1
- ❌ Risk 2

### Neutral
- 🔄 Change 1
- 🔄 Change 2

## Alternatives Considered
What other options were evaluated?

## Implementation Notes
Any specific implementation details or migration steps.

## References
- [Link to related discussions]
- [Link to research/benchmarks]`}
              </pre>
            </div>

            {/* Runbook Template */}
            <div className="border border-slate-200 rounded-lg p-4">
              <h4 className="font-bold text-slate-800 mb-3">⚙️ Runbook Template</h4>
              <pre className="bg-slate-900 text-slate-100 p-3 rounded text-xs overflow-x-auto mb-3">
{`# Runbook: [Procedure Name]

## Overview
**Purpose**: What this runbook accomplishes
**Frequency**: When this is typically run
**Duration**: Expected time to complete
**Risk Level**: Low/Medium/High

## Prerequisites
- [ ] Access to production systems
- [ ] VPN connection established
- [ ] Backup completed (if applicable)

## Steps

### 1. Pre-checks
- [ ] Verify system health: [monitoring link]
- [ ] Check for ongoing incidents
- [ ] Notify team in #ops-channel

### 2. Main Procedure
\`\`\`bash
# Step 2.1: Command description
kubectl get pods -n production

# Step 2.2: Expected output should show...
# NAME                     READY   STATUS
# service-xxx-yyy         1/1     Running
\`\`\`

### 3. Verification
- [ ] Check logs: \`kubectl logs -f deployment/service\`
- [ ] Verify metrics: [dashboard link]
- [ ] Test key functionality: [test endpoint]

### 4. Post-procedure
- [ ] Update status page if needed
- [ ] Document any issues encountered
- [ ] Notify stakeholders of completion

## Rollback Procedure
If something goes wrong:
1. Stop current operation
2. Run rollback commands:
   \`\`\`bash
   kubectl rollout undo deployment/service
   \`\`\`
3. Verify rollback successful
4. Escalate to on-call engineer

## Troubleshooting
**Issue**: Common problem 1
**Solution**: How to fix it

**Issue**: Common problem 2  
**Solution**: How to fix it

## Contacts
- **Primary**: @engineer-name
- **Escalation**: @team-lead
- **Emergency**: @on-call`}
              </pre>
            </div>

            {/* API Documentation Template */}
            <div className="border border-slate-200 rounded-lg p-4">
              <h4 className="font-bold text-slate-800 mb-3">🔌 API Documentation Template</h4>
              <pre className="bg-slate-900 text-slate-100 p-3 rounded text-xs overflow-x-auto mb-3">
{`# API Documentation: [Service Name]

## Base Information
- **Base URL**: https://api.example.com/v1
- **Authentication**: Bearer token
- **Rate Limiting**: 1000 requests/hour
- **Versioning**: URL path versioning

## Authentication
\`\`\`bash
curl -H "Authorization: Bearer YOUR_TOKEN" \\
     https://api.example.com/v1/endpoint
\`\`\`

## Endpoints

### GET /users/{id}
**Purpose**: Retrieve user information

**Parameters**:
- \`id\` (path, required): User ID (integer)
- \`include\` (query, optional): Related data to include

**Request Example**:
\`\`\`bash
curl -X GET \\
  "https://api.example.com/v1/users/123?include=profile" \\
  -H "Authorization: Bearer token"
\`\`\`

**Response (200 OK)**:
\`\`\`json
{
  "id": 123,
  "name": "John Doe",
  "email": "john@example.com",
  "profile": {
    "avatar": "https://...",
    "bio": "Software engineer"
  }
}
\`\`\`

**Error Responses**:
- \`404\`: User not found
- \`401\`: Invalid or missing token
- \`429\`: Rate limit exceeded

### POST /users
**Purpose**: Create a new user

**Request Body**:
\`\`\`json
{
  "name": "string (required, 1-100 chars)",
  "email": "string (required, valid email)",
  "password": "string (required, min 8 chars)"
}
\`\`\`

**Response (201 Created)**:
\`\`\`json
{
  "id": 124,
  "name": "Jane Doe",
  "email": "jane@example.com",
  "created_at": "2024-10-11T18:30:00Z"
}
\`\`\`

## Error Handling
All errors follow this format:
\`\`\`json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid email format",
    "details": {
      "field": "email",
      "value": "invalid-email"
    }
  }
}
\`\`\`

## SDKs & Examples
- **JavaScript**: [Link to SDK]
- **Python**: [Link to SDK]
- **Postman Collection**: [Link]`}
              </pre>
            </div>

          </div>
        </div>

        {/* Documentation Categories */}
        <div className="space-y-4">
          {docStructure.map((category, idx) => (
            <div key={idx} className="bg-white border-2 border-slate-200 rounded-lg overflow-hidden">
              <div className="bg-slate-50 border-b-2 border-slate-200 p-4">
                <h3 className="text-lg font-bold text-slate-800">{category.category}</h3>
                <p className="text-sm text-slate-600 mt-1">
                  📍 Location: <span className="font-medium">{category.location}</span>
                </p>
              </div>
              <div className="p-4 space-y-4">
                {category.sections.map((section, sIdx) => (
                  <div key={sIdx} className="border border-slate-200 rounded-lg p-4">
                    <div className="flex items-start justify-between mb-3">
                      <h4 className="font-bold text-slate-800">{section.title}</h4>
                      {section.required && (
                        <span className="px-2 py-1 bg-red-100 text-red-700 text-xs rounded font-medium shrink-0 ml-2">
                          REQUIRED
                        </span>
                      )}
                    </div>
                    <ul className="space-y-1.5 mb-3">
                      {section.content.map((item, iIdx) => (
                        <li key={iIdx} className="text-sm text-slate-700 flex items-start">
                          <span className="text-blue-600 mr-2">▸</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                    {section.example && (
                      <div className="mt-3 pt-3 border-t border-slate-200">
                        <p className="text-xs font-semibold text-slate-600 mb-2">Example:</p>
                        <pre className="bg-slate-900 text-slate-100 p-3 rounded text-xs overflow-x-auto">
                          {section.example}
                        </pre>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Best Practices */}
        <div className="bg-white border-2 border-slate-200 rounded-lg p-6">
          <h3 className="text-xl font-bold text-slate-800 mb-4">
            📋 Documentation Best Practices
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {bestPractices.map((practice, idx) => (
              <div key={idx} className="border border-slate-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                <h4 className="font-bold text-slate-800 mb-2">{practice.practice}</h4>
                <p className="text-sm text-slate-600 mb-2">{practice.description}</p>
                <p className="text-xs text-blue-600">
                  <strong>Why:</strong> {practice.why}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Documentation Maintenance Schedule */}
        <div className="bg-white border-2 border-slate-200 rounded-lg p-6">
          <h3 className="text-xl font-bold text-slate-800 mb-4">
            🔄 Maintenance Schedule
          </h3>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <span className="px-3 py-1 bg-green-100 text-green-700 rounded font-semibold text-sm shrink-0">
                Daily
              </span>
              <p className="text-sm text-slate-700">
                Update docs when making code changes (README, code comments, API docs)
              </p>
            </div>
            <div className="flex items-start gap-3">
              <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded font-semibold text-sm shrink-0">
                Weekly
              </span>
              <p className="text-sm text-slate-700">
                Update runbooks based on incidents, review and close outdated tickets
              </p>
            </div>
            <div className="flex items-start gap-3">
              <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded font-semibold text-sm shrink-0">
                Monthly
              </span>
              <p className="text-sm text-slate-700">
                Review and update architecture diagrams, check for broken links
              </p>
            </div>
            <div className="flex items-start gap-3">
              <span className="px-3 py-1 bg-orange-100 text-orange-700 rounded font-semibold text-sm shrink-0">
                Quarterly
              </span>
              <p className="text-sm text-slate-700">
                Full documentation audit, identify gaps, sunset outdated docs, gather feedback
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const DependenciesView = () => {
    // Create a comprehensive dependency graph from the workflow data
    const createDependencyGraph = () => {
      const nodes = [];
      const edges = [];
      const nodeMap = new Map();

      // Add all stages as nodes
      workflow.forEach((phase, phaseIdx) => {
        phase.stages.forEach((stage) => {
          const node = {
            id: stage.id,
            name: stage.name,
            phase: phase.phase,
            color: phase.color,
            owner: stage.owner,
            hasInternalDocs: stage.internalDocs.length > 0,
            hasExternalDocs: stage.externalDocs.length > 0,
            inputCount: stage.inputs.length,
            outputCount: stage.outputs.length
          };
          nodes.push(node);
          nodeMap.set(stage.id, node);
        });
      });

      // Add dependency edges
      workflow.forEach((phase) => {
        phase.stages.forEach((stage) => {
          stage.dependencies.forEach((depId) => {
            if (nodeMap.has(depId)) {
              edges.push({
                from: depId,
                to: stage.id,
                type: 'dependency'
              });
            }
          });

          // Add data flow edges from inputs
          stage.inputs.forEach((input) => {
            if (input.source && nodeMap.has(input.source)) {
              edges.push({
                from: input.source,
                to: stage.id,
                type: 'dataflow',
                label: input.name
              });
            }
          });
        });
      });

      return { nodes, edges };
    };

    const { nodes, edges } = createDependencyGraph();

    // Group nodes by phase for better visualization
    const nodesByPhase = workflow.map((phase, idx) => ({
      ...phase,
      nodes: nodes.filter(node => node.phase === phase.phase)
    }));

    return (
      <div className="space-y-6">
        <div className="bg-gradient-to-r from-green-50 to-teal-50 border-2 border-green-200 rounded-lg p-6">
          <h2 className="text-2xl font-bold text-slate-800 mb-2">Documentation & Data Dependencies Graph</h2>
          <p className="text-slate-600">
            Visual representation of how documentation and data flows through the development process
          </p>
        </div>

        {/* Graph Controls */}
        <div className="bg-white border-2 border-slate-200 rounded-lg p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-slate-800">Graph Legend</h3>
            <div className="flex gap-4 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-blue-500 rounded"></div>
                <span>Dependency Flow</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded"></div>
                <span>Data Flow</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-blue-600 rounded bg-blue-100"></div>
                <span>Internal Docs</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-green-600 rounded bg-green-100"></div>
                <span>External Docs</span>
              </div>
            </div>
          </div>
        </div>

        {/* Phase-by-Phase Graph */}
        <div className="space-y-8">
          {nodesByPhase.map((phase, phaseIdx) => (
            <div key={phaseIdx} className="bg-white border-2 border-slate-200 rounded-lg p-6">
              <div className={`border-l-8 ${phase.color} pl-4 mb-6`}>
                <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                  {phase.icon}
                  {phase.phase}
                </h3>
                <p className="text-sm text-slate-600">{phase.nodes.length} stages</p>
              </div>

              {/* Stage Nodes */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-6">
                {phase.nodes.map((node) => (
                  <div
                    key={node.id}
                    className={`relative border-2 rounded-lg p-3 ${
                      node.hasInternalDocs && node.hasExternalDocs
                        ? 'border-purple-300 bg-purple-50'
                        : node.hasInternalDocs
                        ? 'border-blue-300 bg-blue-50'
                        : node.hasExternalDocs
                        ? 'border-green-300 bg-green-50'
                        : 'border-slate-300 bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-mono bg-slate-200 px-2 py-1 rounded font-semibold">
                        {node.id}
                      </span>
                      <div className="flex gap-1">
                        {node.hasInternalDocs && (
                          <div className="w-2 h-2 bg-blue-500 rounded-full" title="Creates Internal Docs"></div>
                        )}
                        {node.hasExternalDocs && (
                          <div className="w-2 h-2 bg-green-500 rounded-full" title="Creates External Docs"></div>
                        )}
                      </div>
                    </div>
                    <h4 className="font-bold text-sm text-slate-800 mb-1">{node.name}</h4>
                    <p className="text-xs text-slate-600 mb-2">{node.owner}</p>
                    <div className="flex justify-between text-xs text-slate-500">
                      <span>In: {node.inputCount}</span>
                      <span>Out: {node.outputCount}</span>
                    </div>

                    {/* Connection indicators */}
                    <div className="absolute -right-2 top-1/2 transform -translate-y-1/2">
                      {edges.filter(edge => edge.from === node.id).length > 0 && (
                        <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                          <div className="w-2 h-2 bg-white rounded-full"></div>
                        </div>
                      )}
                    </div>
                    <div className="absolute -left-2 top-1/2 transform -translate-y-1/2">
                      {edges.filter(edge => edge.to === node.id).length > 0 && (
                        <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                          <div className="w-2 h-2 bg-white rounded-full"></div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Dependencies for this phase */}
              {edges.filter(edge => 
                phase.nodes.some(node => node.id === edge.to) || 
                phase.nodes.some(node => node.id === edge.from)
              ).length > 0 && (
                <div className="border-t border-slate-200 pt-4">
                  <h4 className="font-bold text-slate-800 mb-3">Dependencies & Data Flows</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {edges
                      .filter(edge => 
                        phase.nodes.some(node => node.id === edge.to) || 
                        phase.nodes.some(node => node.id === edge.from)
                      )
                      .map((edge, idx) => {
                        const fromNode = nodes.find(n => n.id === edge.from);
                        const toNode = nodes.find(n => n.id === edge.to);
                        return (
                          <div key={idx} className="flex items-center gap-2 text-sm bg-slate-50 p-2 rounded">
                            <span className="font-mono text-xs bg-slate-200 px-2 py-1 rounded">
                              {edge.from}
                            </span>
                            <div className={`flex-1 h-0.5 ${edge.type === 'dependency' ? 'bg-blue-500' : 'bg-green-500'}`}></div>
                            <span className="font-mono text-xs bg-slate-200 px-2 py-1 rounded">
                              {edge.to}
                            </span>
                            {edge.label && (
                              <span className="text-xs text-slate-500 ml-2">({edge.label})</span>
                            )}
                          </div>
                        );
                      })}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Summary Statistics */}
        <div className="bg-white border-2 border-slate-200 rounded-lg p-6">
          <h3 className="text-xl font-bold text-slate-800 mb-4">Dependency Analysis</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">{nodes.length}</div>
              <div className="text-sm text-slate-600">Total Stages</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">{edges.length}</div>
              <div className="text-sm text-slate-600">Total Dependencies</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600">
                {nodes.filter(n => n.hasInternalDocs).length}
              </div>
              <div className="text-sm text-slate-600">Internal Doc Creators</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-600">
                {nodes.filter(n => n.hasExternalDocs).length}
              </div>
              <div className="text-sm text-slate-600">External Doc Creators</div>
            </div>
          </div>
        </div>

        {/* Critical Path Analysis */}
        <div className="bg-white border-2 border-slate-200 rounded-lg p-6">
          <h3 className="text-xl font-bold text-slate-800 mb-4">Critical Documentation Paths</h3>
          <div className="space-y-4">
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <h4 className="font-bold text-red-800 mb-2">🚨 High-Risk Dependencies</h4>
              <p className="text-sm text-slate-600 mb-3">
                Stages that many others depend on - failure here blocks multiple downstream processes
              </p>
              <div className="space-y-2">
                {nodes
                  .filter(node => edges.filter(edge => edge.from === node.id).length >= 3)
                  .map(node => (
                    <div key={node.id} className="flex items-center justify-between bg-white p-2 rounded">
                      <div>
                        <span className="font-mono text-xs bg-slate-200 px-2 py-1 rounded mr-2">
                          {node.id}
                        </span>
                        <span className="font-semibold">{node.name}</span>
                      </div>
                      <span className="text-sm text-red-600">
                        {edges.filter(edge => edge.from === node.id).length} dependencies
                      </span>
                    </div>
                  ))}
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="font-bold text-blue-800 mb-2">📚 Documentation Bottlenecks</h4>
              <p className="text-sm text-slate-600 mb-3">
                Stages that create documentation needed by many others
              </p>
              <div className="space-y-2">
                {nodes
                  .filter(node => (node.hasInternalDocs || node.hasExternalDocs) && 
                    edges.filter(edge => edge.from === node.id).length >= 2)
                  .map(node => (
                    <div key={node.id} className="flex items-center justify-between bg-white p-2 rounded">
                      <div>
                        <span className="font-mono text-xs bg-slate-200 px-2 py-1 rounded mr-2">
                          {node.id}
                        </span>
                        <span className="font-semibold">{node.name}</span>
                        <div className="flex gap-1 ml-2">
                          {node.hasInternalDocs && (
                            <span className="px-1 py-0.5 bg-blue-100 text-blue-700 text-xs rounded">Internal</span>
                          )}
                          {node.hasExternalDocs && (
                            <span className="px-1 py-0.5 bg-green-100 text-green-700 text-xs rounded">External</span>
                          )}
                        </div>
                      </div>
                      <span className="text-sm text-blue-600">
                        {edges.filter(edge => edge.from === node.id).length} downstream
                      </span>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-800 mb-2">
            Complete Development & Documentation System
          </h1>
          <p className="text-slate-600">
            A comprehensive view of data flow, documentation dependencies, and real-world impact
          </p>
        </div>

        {/* View Toggle */}
        <div className="mb-6 flex gap-4">
          <button
            onClick={() => setActiveView('workflow')}
            className={`px-6 py-3 rounded-lg font-semibold transition-all ${
              activeView === 'workflow'
                ? 'bg-blue-600 text-white shadow-lg'
                : 'bg-white text-slate-600 border-2 border-slate-200 hover:border-blue-300'
            }`}
          >
            📊 Full Workflow View
          </button>
          <button
            onClick={() => setActiveView('usecases')}
            className={`px-6 py-3 rounded-lg font-semibold transition-all ${
              activeView === 'usecases'
                ? 'bg-blue-600 text-white shadow-lg'
                : 'bg-white text-slate-600 border-2 border-slate-200 hover:border-blue-300'
            }`}
          >
            🎯 Use Cases & Impact
          </button>
          <button
            onClick={() => setActiveView('structure')}
            className={`px-6 py-3 rounded-lg font-semibold transition-all ${
              activeView === 'structure'
                ? 'bg-blue-600 text-white shadow-lg'
                : 'bg-white text-slate-600 border-2 border-slate-200 hover:border-blue-300'
            }`}
          >
            📚 Documentation Structure
          </button>
          <button
            onClick={() => setActiveView('dependencies')}
            className={`px-6 py-3 rounded-lg font-semibold transition-all ${
              activeView === 'dependencies'
                ? 'bg-blue-600 text-white shadow-lg'
                : 'bg-white text-slate-600 border-2 border-slate-200 hover:border-blue-300'
            }`}
          >
            🔗 Dependencies Graph
          </button>
        </div>

        {activeView === 'workflow' ? (
          <>
            {/* Filter Options */}
            <div className="mb-6 bg-white border-2 border-slate-200 rounded-lg p-4">
              <div className="flex items-center gap-4">
                <span className="font-semibold text-slate-700">Filter by:</span>
                <button
                  onClick={() => setFilterDocType('all')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    filterDocType === 'all'
                      ? 'bg-slate-700 text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  All Stages
                </button>
                <button
                  onClick={() => setFilterDocType('internal')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    filterDocType === 'internal'
                      ? 'bg-blue-600 text-white'
                      : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                  }`}
                >
                  Internal Docs Only
                </button>
                <button
                  onClick={() => setFilterDocType('external')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    filterDocType === 'external'
                      ? 'bg-green-600 text-white'
                      : 'bg-green-100 text-green-700 hover:bg-green-200'
                  }`}
                >
                  External Docs Only
                </button>
              </div>
            </div>

            {/* Workflow Phases */}
            <div className="space-y-6">
              {getFilteredStages().map((phase, phaseIdx) => (
                <div key={phaseIdx} className="bg-white border-2 border-slate-200 rounded-lg overflow-hidden">
                  <button
                    onClick={() => togglePhase(phaseIdx)}
                    className={`w-full p-5 flex items-center justify-between hover:bg-slate-50 transition-colors border-l-8 ${phase.color}`}
                  >
                    <div className="flex items-center gap-3">
                      {phase.icon}
                      <h2 className="text-xl font-bold text-slate-800">{phase.phase}</h2>
                      <span className="text-sm text-slate-600">
                        ({phase.stages.length} stage{phase.stages.length !== 1 ? 's' : ''})
                      </span>
                    </div>
                    {expandedPhases[phaseIdx] ? <ChevronDown /> : <ChevronRight />}
                  </button>
                  
                  {expandedPhases[phaseIdx] && (
                    <div className="p-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 bg-slate-50">
                      {phase.stages.map((stage) => (
                        <StageCard key={stage.id} stage={stage} phaseColor={phase.color} />
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Legend */}
            <div className="mt-8 bg-white border-2 border-slate-200 rounded-lg p-6">
              <h3 className="font-bold text-slate-800 mb-4">Legend</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div>
                  <span className="font-semibold">Stage ID:</span>
                  <p className="text-slate-600">Format: Phase#Letter (e.g., 2a = Planning phase, first stage)</p>
                </div>
                <div>
                  <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded font-medium">Internal</span>
                  <p className="text-slate-600 mt-1">Creates technical/internal documentation</p>
                </div>
                <div>
                  <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded font-medium">External</span>
                  <p className="text-slate-600 mt-1">Creates user-facing documentation</p>
                </div>
              </div>
            </div>
          </>
        ) : activeView === 'usecases' ? (
          <UseCasesView />
        ) : activeView === 'structure' ? (
          <StructureView />
        ) : (
          <DependenciesView />
        )}

        {/* Detail Modal */}
        {selectedStage && (
          <DetailModal stage={selectedStage} onClose={() => setSelectedStage(null)} />
        )}
      </div>
    </div>
  );
};

export default CompleteDocSystem;