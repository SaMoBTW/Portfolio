pipeline {
  agent {
    kubernetes {
      yaml '''
apiVersion: v1
kind: Pod
spec:
  containers:
  - name: kaniko
    image: gcr.io/kaniko-project/executor:debug
    command: ["sleep"]
    args: ["9999999"]
    volumeMounts:
    - name: docker-config
      mountPath: /kaniko/.docker
  - name: git
    image: alpine/git:latest
    command: ["sleep"]
    args: ["9999999"]
  volumes:
  - name: docker-config
    secret:
      secretName: ghcr-secret
      items:
      - key: .dockerconfigjson
        path: config.json
'''
    }
  }
  environment {
    IMAGE = "ghcr.io/samobtw/portfolio"
  }
  stages {
    stage('Build and push') {
      steps {
        container('kaniko') {
          sh '''
            /kaniko/executor --context `pwd` --dockerfile Dockerfile --destination ${IMAGE}:${GIT_COMMIT}
          '''
        }
      }
    }
    stage('Bump tag in homelab-config') {
      steps {
        container('git') {
          sshagent(['homelab-config-deploy-key']) {
            sh '''
              mkdir -p ~/.ssh && ssh-keyscan github.com >> ~/.ssh/known_hosts
              git clone git@github.com:SaMoBTW/homelab-config.git /tmp/config
              cd /tmp/config
              sed -i "s|image: ghcr.io/samobtw/portfolio:.*|image: ${IMAGE}:${GIT_COMMIT}|" manifests/portfolio/deployment.yaml
              git config user.email "jenkins@homelab"
              git config user.name "jenkins"
              git commit -am "portfolio: ${GIT_COMMIT}"
              git push
            '''
          }
        }
      }
    }
  }
}