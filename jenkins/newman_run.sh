#!/bin/bash

###############################################################################
# newman_run.sh
# Standalone shell script to execute Newman tests
# Can be used in Jenkins, CI/CD pipelines, or local execution
###############################################################################

# Enable strict error handling
set -e  # Exit immediately if a command exits with a non-zero status
set -u  # Treat unset variables as an error
set -o pipefail  # Return value of a pipeline is the status of the last command to exit with a non-zero status

# Color codes for output formatting (works in most terminals)
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color (reset)

###############################################################################
# Function: Print colored messages
###############################################################################
print_info() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

print_separator() {
    echo "=========================================="
}

###############################################################################
# Function: Display usage information
###############################################################################
usage() {
    cat << EOF
Usage: $0 [OPTIONS]

Execute Postman collections using Newman CLI

OPTIONS:
    -c, --collection    Collection file name (required)
    -e, --environment   Environment name (dev/qa/prod) - default: dev
    -d, --data          Data file name (optional)
    -i, --iterations    Number of iterations - default: 1
    -r, --reporters     Reporters (comma-separated) - default: cli,html,junitfull
    -h, --help          Display this help message

EXAMPLES:
    # Run user management tests on dev environment
    $0 -c user_management.postman_collection.json -e dev -d users_data.json

    # Run orders tests on QA with 5 iterations
    $0 -c orders_api.postman_collection.json -e qa -d orders_data.csv -i 5

    # Run tests without data file
    $0 -c user_management.postman_collection.json -e prod

EOF
}

###############################################################################
# Function: Check if required tools are installed
###############################################################################
check_dependencies() {
    print_info "Checking dependencies..."
    
    # Check if Node.js is installed
    if ! command -v node &> /dev/null; then
        print_error "Node.js is not installed. Please install Node.js first."
        exit 1
    fi
    print_success "Node.js found: $(node --version)"
    
    # Check if npm is installed
    if ! command -v npm &> /dev/null; then
        print_error "npm is not installed. Please install npm first."
        exit 1
    fi
    print_success "npm found: $(npm --version)"
    
    # Check if Newman is installed
    if ! command -v newman &> /dev/null && ! npx newman --version &> /dev/null; then
        print_warning "Newman not found. Installing Newman..."
        npm install -g newman newman-reporter-html newman-reporter-junitfull
    fi
    print_success "Newman found: $(npx newman --version || newman --version)"
}

###############################################################################
# Function: Validate file paths
###############################################################################
validate_files() {
    print_info "Validating files..."
    
    # Check if collection file exists
    if [ ! -f "${COLLECTION_PATH}" ]; then
        print_error "Collection file not found: ${COLLECTION_PATH}"
        exit 1
    fi
    print_success "Collection file found: ${COLLECTION_PATH}"
    
    # Check if environment file exists
    if [ ! -f "${ENV_PATH}" ]; then
        print_error "Environment file not found: ${ENV_PATH}"
        exit 1
    fi
    print_success "Environment file found: ${ENV_PATH}"
    
    # Check if data file exists (if specified)
    if [ -n "${DATA_FILE}" ]; then
        if [ ! -f "${DATA_PATH}" ]; then
            print_warning "Data file not found: ${DATA_PATH}"
            print_warning "Tests will run without data file"
            DATA_FILE=""
        else
            print_success "Data file found: ${DATA_PATH}"
        fi
    fi
}

###############################################################################
# Function: Create reports directory
###############################################################################
prepare_reports_dir() {
    print_info "Preparing reports directory..."
    
    # Create reports directory if it doesn't exist
    mkdir -p "${REPORTS_DIR}"
    
    # Create timestamped subdirectory for this run
    TIMESTAMP=$(date '+%Y%m%d_%H%M%S')
    RUN_REPORTS_DIR="${REPORTS_DIR}/run_${TIMESTAMP}"
    mkdir -p "${RUN_REPORTS_DIR}"
    
    print_success "Reports will be saved to: ${RUN_REPORTS_DIR}"
}

###############################################################################
# Function: Build Newman command
###############################################################################
build_newman_command() {
    print_info "Building Newman command..."
    
    # Start with base command
    NEWMAN_CMD="npx newman run \"${COLLECTION_PATH}\""
    
    # Add environment file
    NEWMAN_CMD="${NEWMAN_CMD} -e \"${ENV_PATH}\""
    
    # Add data file if specified
    if [ -n "${DATA_FILE}" ]; then
        NEWMAN_CMD="${NEWMAN_CMD} -d \"${DATA_PATH}\""
    fi
    
    # Add iteration count
    NEWMAN_CMD="${NEWMAN_CMD} --iteration-count ${ITERATIONS}"
    
    # Add reporters
    NEWMAN_CMD="${NEWMAN_CMD} -r ${REPORTERS}"
    
    # Add report output paths
    NEWMAN_CMD="${NEWMAN_CMD} --reporter-html-export \"${RUN_REPORTS_DIR}/report.html\""
    NEWMAN_CMD="${NEWMAN_CMD} --reporter-junitfull-export \"${RUN_REPORTS_DIR}/report.xml\""
    
    # Add additional Newman options
    NEWMAN_CMD="${NEWMAN_CMD} --color off"
    NEWMAN_CMD="${NEWMAN_CMD} --disable-unicode"
    NEWMAN_CMD="${NEWMAN_CMD} --timeout-request 30000"
    NEWMAN_CMD="${NEWMAN_CMD} --timeout-script 10000"
    
    print_success "Newman command built successfully"
}

###############################################################################
# Function: Execute Newman tests
###############################################################################
execute_tests() {
    print_separator
    print_info "Executing Newman tests..."
    print_separator
    
    # Display test configuration
    echo ""
    echo "Test Configuration:"
    echo "  Collection: ${COLLECTION_FILE}"
    echo "  Environment: ${ENVIRONMENT}"
    echo "  Data File: ${DATA_FILE:-None}"
    echo "  Iterations: ${ITERATIONS}"
    echo "  Reporters: ${REPORTERS}"
    echo ""
    print_separator
    
    # Record start time
    START_TIME=$(date +%s)
    
    # Execute Newman command
    eval "${NEWMAN_CMD}" || TEST_RESULT=$?
    
    # Record end time
    END_TIME=$(date +%s)
    DURATION=$((END_TIME - START_TIME))
    
    print_separator
    print_info "Test execution completed in ${DURATION} seconds"
    print_separator
}

###############################################################################
# Function: Display test summary
###############################################################################
display_summary() {
    print_separator
    print_info "Test Execution Summary"
    print_separator
    
    echo ""
    echo "Collection: ${COLLECTION_FILE}"
    echo "Environment: ${ENVIRONMENT}"
    echo "Iterations: ${ITERATIONS}"
    echo "Duration: ${DURATION}s"
    echo ""
    echo "Reports Location: ${RUN_REPORTS_DIR}"
    echo ""
    
    # List generated reports
    if [ -d "${RUN_REPORTS_DIR}" ]; then
        print_info "Generated Reports:"
        ls -lh "${RUN_REPORTS_DIR}/"
    fi
    
    echo ""
    print_separator
    
    # Check test result
    if [ ${TEST_RESULT:-0} -eq 0 ]; then
        print_success "All tests passed! ✅"
    else
        print_error "Some tests failed! ❌"
        print_info "Check the reports for details: ${RUN_REPORTS_DIR}/report.html"
    fi
    
    print_separator
}

###############################################################################
# MAIN SCRIPT EXECUTION
###############################################################################

# Set default values
ENVIRONMENT="dev"
DATA_FILE=""
ITERATIONS=1
REPORTERS="cli,html,junitfull"
COLLECTION_FILE=""
TEST_RESULT=0

# Base directories
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(dirname "${SCRIPT_DIR}")"
COLLECTIONS_DIR="${PROJECT_ROOT}/collections"
ENVIRONMENTS_DIR="${PROJECT_ROOT}/environments"
DATA_DIR="${PROJECT_ROOT}/data"
REPORTS_DIR="${PROJECT_ROOT}/reports"

# Parse command line arguments
while [[ $# -gt 0 ]]; do
    case $1 in
        -c|--collection)
            COLLECTION_FILE="$2"
            shift 2
            ;;
        -e|--environment)
            ENVIRONMENT="$2"
            shift 2
            ;;
        -d|--data)
            DATA_FILE="$2"
            shift 2
            ;;
        -i|--iterations)
            ITERATIONS="$2"
            shift 2
            ;;
        -r|--reporters)
            REPORTERS="$2"
            shift 2
            ;;
        -h|--help)
            usage
            exit 0
            ;;
        *)
            print_error "Unknown option: $1"
            usage
            exit 1
            ;;
    esac
done

# Validate required arguments
if [ -z "${COLLECTION_FILE}" ]; then
    print_error "Collection file is required!"
    usage
    exit 1
fi

# Build file paths
COLLECTION_PATH="${COLLECTIONS_DIR}/${COLLECTION_FILE}"
ENV_PATH="${ENVIRONMENTS_DIR}/${ENVIRONMENT}.postman_environment.json"
DATA_PATH="${DATA_DIR}/${DATA_FILE}"

# Execute main workflow
print_separator
print_info "Starting Newman Test Execution"
print_separator

check_dependencies
validate_files
prepare_reports_dir
build_newman_command
execute_tests
display_summary

# Exit with test result status
exit ${TEST_RESULT:-0}

